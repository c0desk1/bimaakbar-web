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

    const blogs: Blog[] = data.values.slice(1).map((row: any[]) => ({
      id: row[0],
      slug: row[1],
      title: row[2],
      description: row[3],
      featured: row[4],
      cover: row[5],
      date: row[6],
      lastModified: row[7],
      content: row[8],
      status: row[9],
      category: row[10],
      tags: row[11],
      author: row[12],
      canonicalUrl: row[13],
      metaTitle: row[14],
      metaDescription: row[15],
      metaKeywords: row[16],
    }));

    return blogs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchBlog;
