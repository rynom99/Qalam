import MarkdownUI from "./components/markdownEditor/MarkdownNotesUI";

export default function Home() {
  return (
    <div className="absolute h-screen w-screen">
      <h1>Qalam</h1>
      <hr />
      <p className="w-full h-8 border-1" />
      <MarkdownUI />
    </div>
  );
}
