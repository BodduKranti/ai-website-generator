'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import WebpageToo from './WebpageToo';
import { HTML_WEB_CODE } from './HTMLCode';
import { useGetFrameDetails } from '../../Context/GetFrameDetails';
import { toast } from 'sonner';
import { routesApiurl } from '../../types';
import axios from 'axios';

interface PlaygroundwebsiteDesignsectionprops {
    generatedCode: string;
    projectid: any,
    frameId: any
}

const PlaygroundWebsiteDesignsection: FC<
    PlaygroundwebsiteDesignsectionprops
> = ({ generatedCode, projectid, frameId }) => {
    const { setSelectedEl, onSaveEl, setOnSaveElloading } = useGetFrameDetails();

    const [screensizesWeb, setScreensizesWeb] = useState('web');

    const iFrameRef = useRef<HTMLIFrameElement>(null);
    const cleanupRef = useRef<(() => void) | null>(null);

    const attachEditorEvents = (doc: Document) => {

        cleanupRef.current?.();

        if (!doc.body) return;

        let hoverEl: HTMLElement | null = null;

        let selectedEl: HTMLElement | null = null;

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target === doc.body || target === doc.documentElement) { return; }

            if (selectedEl === target) { return; }
            if (hoverEl && hoverEl !== target) { hoverEl.style.outline = ''; }
            hoverEl = target;
            hoverEl.style.outline = '2px dotted blue';
        };

        const handleMouseOut = () => {
            if (hoverEl && hoverEl !== selectedEl) {
                hoverEl.style.outline = '';
                hoverEl = null;
            }
        };

        const handleBlur = () => {
            if (selectedEl) {
                console.log('Updated Element:', selectedEl.outerHTML);
            }
        };

        const handleClick = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const target = e.target as HTMLElement;
            if (target === doc.body || target === doc.documentElement) { return; }
            if (selectedEl && selectedEl !== target) {
                selectedEl.style.outline = '';
                selectedEl.removeAttribute('contenteditable');
                selectedEl.removeEventListener('blur', handleBlur);
            }

            selectedEl = target;

            selectedEl.style.outline = '2px solid red';
            selectedEl.setAttribute('contenteditable', 'true');
            selectedEl.focus();
            selectedEl.addEventListener('blur', handleBlur);
            setSelectedEl(selectedEl);
            console.log('Selected Element:', selectedEl);
        };

        const handleKeyDown = (e: KeyboardEvent) => {

            if (e.key === 'Escape' && selectedEl) {
                selectedEl.style.outline = '';
                selectedEl.removeAttribute('contenteditable');
                selectedEl.removeEventListener('blur', handleBlur);
                selectedEl = null;
            }
        };

        doc.body.addEventListener('mouseover', handleMouseOver);

        doc.body.addEventListener('mouseout', handleMouseOut);

        doc.body.addEventListener('click', handleClick);

        doc.addEventListener('keydown', handleKeyDown);

        cleanupRef.current = () => {
            doc.body?.removeEventListener('mouseover', handleMouseOver);
            doc.body?.removeEventListener('mouseout', handleMouseOut);
            doc.body?.removeEventListener('click', handleClick);
            doc.removeEventListener('keydown', handleKeyDown);
        };
    };

    // Load iframe shell once
    useEffect(() => {

        const iframe = iFrameRef.current;

        if (!iframe) return;

        const doc: any = iframe.contentDocument || iframe.contentWindow?.document;

        if (!doc) return;

        doc.open();
        doc.write(
            HTML_WEB_CODE
        );
        doc.close();

        const timer =
            setTimeout(() => {
                attachEditorEvents(doc);
            }, 300);

        return () => {
            clearTimeout(timer);
            cleanupRef.current?.();
        };

    }, []);

    // Update generated html only
    useEffect(() => {
        const iframe = iFrameRef.current;
        if (!iframe) return;
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;
        const root = doc.getElementById('root');
        if (!root) return;
        const cleanHtml = generatedCode?.replaceAll('```html', '')?.replaceAll('```', '')?.trim() || '';
        root.innerHTML = cleanHtml;
        attachEditorEvents(doc);

    }, [generatedCode]);


    useEffect(() => {
        onSaveEl && goSaveelements();
    }, [onSaveEl])

    const goSaveelements = useCallback(() => {
        console.log('element')
        if (iFrameRef.current) {
            try {
                const iframeDoc = iFrameRef.current.contentDocument || iFrameRef.current.contentWindow?.document;
                if (iframeDoc) {
                    const cloneDoc = iframeDoc.cloneNode(true) as Document;
                    // const root = cloneDoc.getElementById('root');
                    cloneDoc.querySelectorAll('script')?.forEach(script => script.remove());
                    const AllEle = cloneDoc.body.querySelectorAll<HTMLElement>('*');
                    AllEle.forEach(el => {
                        el.removeAttribute('contenteditable');
                        el.style.outline = '';
                        el.style.cursor = '';
                    })

                    const html = cloneDoc.documentElement.outerHTML;
                    console.log('Saved HTML:', html);
                    SaveGenerated_code(html)
                }
            } catch (error) {
                console.error('Error occurred while saving elements:', error);
            }
        }
    }, [onSaveEl])


    // Save Generated Code
    const SaveGenerated_code = async (code: string) => {
        setOnSaveElloading(true)
        try {
            const results = await axios.put(routesApiurl.frameGetDetailsURL, {
                frameId: frameId,
                projectId: projectid,
                designCode: code
            })
            console.log(results?.data)
            toast.success('Saved successfully ')
            setOnSaveElloading(false)
        } catch (error) {
            console.log(error)
            setOnSaveElloading(false)
        }

    }

    return (
        <div className="p-5 w-full flex items-center justify-center flex-col ">

            <iframe
                ref={iFrameRef}
                sandbox="allow-scripts allow-same-origin"
                className={`${screensizesWeb ===
                    'web'
                    ? 'w-full'
                    : 'w-[430px]'
                    } h-[700px] rounded-2xl border-2`}
            />

            <WebpageToo
                screensizesWeb={
                    screensizesWeb
                }
                setScreensizesWeb={
                    setScreensizesWeb
                }
                generatedCode={
                    generatedCode
                }
            />
        </div>
    );
};

export default PlaygroundWebsiteDesignsection;