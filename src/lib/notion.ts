import { Client } from '@notionhq/client';
import type { TypeProject } from '../types/types';

const DATABASE_ID = '7eb5404979ac4ed48497da7f16492060';

// Initializing a client
const notion = new Client({
  auth: import.meta.env.NOTION_TOKEN,
});

export async function getDataNotion() {
  const query = { database_id: DATABASE_ID };

  const { results } = await notion.databases.query(query);

  return results.map((page, index) => {
    if (!page) return;

    const { properties } = page as any;

    const { type, cover, url, title } = properties;

    return {
      id: ++index,
      title: title.title[0].plain_text as string,
      cover: cover.files[0].file.url as string,
      type: type['multi_select'][0]['name'] as TypeProject,
      url: url.url as string,
    };
  });

  //   return results.map((page, index) => {
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     const { properties } = page as any;

  //     const { type, cover, url, title } = properties;

  //     return {
  //       id: ++index,
  //       title: title.title[0].plain_text as string,
  //       cover: cover.files[0].file.url as string,
  //       type: type['multi_select'][0]['name'] as string,
  //       url: url['rich_text'][0].plain_text as string,
  //     };
  //   });
}
