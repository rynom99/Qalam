import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export type markdownNote = {
    id: string,
    rawValue: string
}

export function getMarkdownNoteFn() {
    const newNote = (): markdownNote => {
        const stagingLine: markdownNote = {
            id: uuid(),
            rawValue: ""
        };
        return stagingLine;
    }
    const setRawValue = (notes: Array<markdownNote>, id: number, value: string): markdownNote => {
        const note = notes[id] = {
            id: uuid(),
            rawValue: value
        }
        return note;
    };
    return {
        newNote,
        setRawValue
    };
}

const markdownNoteFn = getMarkdownNoteFn();

export function useMarkdownNotes() {
    const [notes, setNotesReactive] = useState<markdownNote[]>([]);
    const [cursor, setCursorReactive] = useState<number>(0);
    const [transactionNr, setTransactionNr] = useState<number>(0);
    
    useEffect(() => {
        updateNotes();
    }, [cursor])

    const updateNotes = () => {
        setTransactionNr(transactionNr + 1);
    }

    useEffect(() => {
        setNotesReactive([...notes]);
    }, [transactionNr])

    const add = (line: markdownNote) => {
        notes.splice(cursor + 1, 0, line);
        goForward();
    }

    const remove = () => {
        notes.splice(cursor, 1);
        goBackward();
    }

    const newNote = (): markdownNote => {
        const stagingLine = markdownNoteFn.newNote();
        add(stagingLine);
        return stagingLine;
    }

    const goForward = () => {
        if(cursor > notes.length) return;
        setCursorReactive(cursor + 1);
    }

    const goBackward = () => {
        if(cursor < 1) return; 
        setCursorReactive(cursor - 1);
    }

    const setRawValue = (value: string): markdownNote => {
        const note = markdownNoteFn.setRawValue(notes, cursor, value);;
        updateNotes();
        return note;
    };

    return {
        setCursorReactive,
        cursor,
        setNotesReactive,
        notes,
        add,
        remove,
        newNote,
        setRawValue,
        goForward,
        goBackward
    }
}
