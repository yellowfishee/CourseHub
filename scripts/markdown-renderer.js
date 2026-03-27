export function renderMarkdown(content) {
    if (typeof marked !== 'undefined') {
        return marked.parse(content);
    }
    return '<p>Markdown renderer not loaded</p>';
}

export function parseFrontMatter(content) {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);

    if (!match) {
        return { data: {}, content };
    }

    const data = {};
    const yamlContent = match[1];
    const body = match[2];

    yamlContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            data[key.trim()] = valueParts.join(':').trim();
        }
    });

    return { data, content: body };
}
