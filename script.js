const keywordInput = document.getElementById('keyword-input');
const generateButton = document.getElementById('generate-button');
const tagContainer = document.getElementById('tag-container');
const copyButton = document.getElementById('copy-button');

function generateTags(keyword) {
    tagContainer.innerHTML = '';
    copyButton.disabled = true;
    copyButton.textContent = 'COPY TAGS';

    if (!keyword.trim()) {
        tagContainer.innerHTML = '<p style="color: #606770;">Please enter a keyword to generate tags.</p>';
        return;
    }

    const baseTags = [
        keyword,
        `${keyword} tips`,
        `best ${keyword}`,
        `${keyword} 2025`,
        `how to ${keyword}`,
        `${keyword} tutorial`,
        `${keyword} review`,
        `learn ${keyword}`,
        `${keyword} for beginners`,
        `free ${keyword} resources`
    ];

    if (keyword.toLowerCase().includes('youtube')) {
        baseTags.push('youtube SEO', 'video marketing', 'grow youtube channel');
    }

    if (keyword.toLowerCase().includes('game') || keyword.toLowerCase().includes('gaming')) {
        baseTags.push('pc gaming', 'mobile gaming', 'gameplay', 'live stream');
    }

    if (keyword.toLowerCase().includes('food') || keyword.toLowerCase().includes('recipe')) {
        baseTags.push('easy recipe', 'cooking show', 'healthy food', 'street food');
    }

    baseTags.forEach(tagText => {
        const tagElement = document.createElement('span');
        tagElement.textContent = tagText.trim();
        tagElement.style.cssText = "background-color:#e7f3ff;color:#1877f2;padding:5px 10px;border-radius:4px;font-size:0.9em;";
        tagContainer.appendChild(tagElement);
    });

    if (baseTags.length > 0) {
        copyButton.disabled = false;
    } else {
        tagContainer.innerHTML = '<p style="color: #606770;">No tags generated for this keyword.</p>';
    }
}

generateButton.addEventListener('click', () => {
    const keyword = keywordInput.value;
    generateTags(keyword);
});

keywordInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const keyword = keywordInput.value;
        generateTags(keyword);
    }
});

copyButton.addEventListener('click', () => {
    const tags = tagContainer.querySelectorAll('span');
    if (tags.length === 0) return;

    const tagTexts = Array.from(tags).map(tag => tag.textContent);
    const tagsString = tagTexts.join(', ');

    navigator.clipboard.writeText(tagsString)
        .then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'COPY TAGS';
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy tags: ', err);
            alert('Could not copy tags. Please try again.');
        });
});
