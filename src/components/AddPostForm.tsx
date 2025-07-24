import LexicalEditor from './LexicalEditor';

export default function AddPostForm() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/api/post')
      .then(res => res.json())
      .then(data => setContent(data?.content || ''));
  }, []);

  return (
    <form>
      <h1 className="text-xl font-bold mb-4">Tambah Post</h1>
      <LexicalEditor onContentChange={(val) => setContent(val)} />
      <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded">
        Submit
      </button>
    </form>
  );
}
