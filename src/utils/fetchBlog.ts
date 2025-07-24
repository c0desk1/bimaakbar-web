interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  featured: string;
  cover: string;
  date: string;
  lastModified: string;
  content: string;
  status: string;
  category: string;
  tags: string;
  author: string;
  canonicalUrl: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

const fetchBlog = async (): Promise<Blog[]> => {
  const googlesheetId = '1x404DP2RoiOOJa_Ik5uo54ZtIDjjUuj5EY0AjeGPFKQ';
  const sheetName = 'Blog';
  const url = `https://opensheet.elk.sh/${googlesheetId}/${sheetName}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const headers = data.values[0];
    const blogs: Blog[] = data.values.slice(1).map((row: any[]) => ({
      id: row[headers.indexOf('id')],
      slug: row[headers.indexOf('slug')],
      title: row[headers.indexOf('title')],
      description: row[headers.indexOf('description')],
      featured: row[headers.indexOf('featured')],
      cover: row[headers.indexOf('cover')],
      date: row[headers.indexOf('date')],
      lastModified: row[headers.indexOf('lastModified')],
      content: row[headers.indexOf('content')],
      status: row[headers.indexOf('status')],
      category: row[headers.indexOf('category')],
      tags: row[headers.indexOf('tags')],
      author: row[headers.indexOf('author')],
      canonicalUrl: row[headers.indexOf('canonicalUrl')],
      metaTitle: row[headers.indexOf('metaTitle')],
      metaDescription: row[headers.indexOf('metaDescription')],
      metaKeywords: row[headers.indexOf('metaKeywords')],
    }));
    return blogs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchBlog;