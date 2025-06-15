'use client';

import { ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";
import { markdownNote } from "./types/markdownNotes";

type Props = {
    note: markdownNote,
    focus: boolean,
    onEnter?: () => void,
    onFocus?: () => void,
    onArrowUp?: () => void,
    onArrowDown?: () => void,
    onDelete?: () => void,
    onChange?: (value: string) => void
};

export default function MarkdownNoteUI(props: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const value = e.target.value;
        props.onChange?.(value);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
        switch(e.key){
            case "Enter":
                e.preventDefault();
                props.onEnter?.();
                break;
            case "ArrowUp":
                e.preventDefault();
                props.onArrowUp?.();
                break;
            case "ArrowDown":
                e.preventDefault();
                props.onArrowDown?.();
                break;
            case "Backspace":
                if(props.note.rawValue.length === 0){
                    e.preventDefault();
                    props.onDelete?.();
                }
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if(props.focus) {
            inputRef.current?.focus();
        }
    }, [props.focus]);

    function handleFocus(): void {
        props.onFocus?.();
    }

    return (
        <input
            ref={inputRef}
            className="w-full h-8 border-1"
            value={props.note.rawValue}
            onFocus={handleFocus}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="text"
        />
    );
}