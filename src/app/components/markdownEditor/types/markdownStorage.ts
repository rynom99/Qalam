'use client';
import { getMarkdownNoteFn, markdownNote } from "./markdownNotes";

export function markdownStorage() {
    const getMarkdown = (): Array<markdownNote> => {
        const obj = localStorage.getItem("notebook");
        if(obj === undefined || obj === null){
            const stagingNote = getMarkdownNoteFn().newNote();
            const stagingNotes = [stagingNote];
            const serializedStagingNotes = JSON.stringify([stagingNote]);
            localStorage.setItem("notebook", serializedStagingNotes);
            return stagingNotes;
        }
        const serializedStagingNotes = JSON.parse(obj);
        return serializedStagingNotes;
    };
    const saveMarkdown = (notes: Array<markdownNote>) => {
        const serializedStagingNotes = JSON.stringify(notes);
        localStorage.setItem("notebook", serializedStagingNotes);
    };
    return {
        getMarkdown,
        saveMarkdown
    };
};
