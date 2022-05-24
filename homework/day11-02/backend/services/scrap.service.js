export class ScrapService {
  scrapFaovritepage = async (prefer) => {
    const url = prefer;

    const html = await axios.get(url);
    const $ = cheerio.load(html.data);

    let result = {};
    $("meta").each((_, el) => {
      if ($(el).attr("property")) {
        const key = $(el).attr("property").split(":")[1];
        const value = $(el).attr("content");
        result[key] = value;
      }
    });
    return result;
  };
}
