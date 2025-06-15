'use client';

import { useEffect } from "react";
import { useMarkdownNotes } from "./types/markdownNotes";
import { markdownStorage } from "./types/markdownStorage";
import MarkdownNoteUI from "./MarkdownNoteUI";

export default function markdownNotesUI() {
    const mdStorage = markdownStorage();
    const mdNotes = useMarkdownNotes();

    useEffect(() => {
        const markdown = mdStorage.getMarkdown();
        mdNotes.setNotesReactive(markdown);
        mdNotes.setCursorReactive(0);
    }, []);

    function handleEnter(): void {
        mdNotes.newNote();
    }

    function handleArrowUp(): void {
        mdNotes.goBackward();
    }

    function handleArrowDown(): void {
        mdNotes.goForward();
    }

    function handleFocus(index: number): void {
        mdNotes.setCursorReactive(index);
    }

    function handleDelete(): void {
        mdNotes.remove();
    }

    return (
        <div className="flex flex-col">
            {mdNotes.notes.map((note, index) => (
                <MarkdownNoteUI
                    key={note.id}
                    note={note}
                    focus={index === mdNotes.cursor}
                    onEnter={handleEnter}
                    onChange={(value: string) => {mdNotes.setRawValue(value)}}
                    onFocus={() => {handleFocus(index)} }
                    onArrowUp={handleArrowUp}
                    onArrowDown={handleArrowDown}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}
