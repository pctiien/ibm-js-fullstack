var xhr = new XMLHttpRequest();
var url = './health_article.json';
xhr.open('GET',url,true)
xhr.responseType = 'json';
xhr.send()
xhr.onload = ()=>{
    var articles = xhr.response.articles
    var articlesDiv = document.getElementById('articles')
    articles.forEach(article=>{

        var articleDiv = document.createElement('div')

        var title = document.createElement('h2')
        title.textContent = article.title
        
        var description = document.createElement('p')
        description.textContent = article.description


        var waysHeader = document.createElement('h3')
        waysHeader.textContent = 'Ways to achieve:'
        var waysList = document.createElement('ul')
        article.ways_to_achieve.forEach(way=>{
            var wayElement = document.createElement('li')
            wayElement.textContent = way
            waysList.appendChild(wayElement)
        })


        var benefitsHeader = document.createElement('h3');
        benefitsHeader.textContent = 'Benefits:';
        var benefitsList = document.createElement('ul');
        article.benefits.forEach(benefit => {
            var listItem = document.createElement('li');
            listItem.textContent = benefit;
            benefitsList.appendChild(listItem);
        });

        articleDiv.appendChild(title);
        articleDiv.appendChild(description);
        articleDiv.appendChild(waysHeader);
        articleDiv.appendChild(waysList);
        articleDiv.appendChild(benefitsHeader);
        articleDiv.appendChild(benefitsList);
        articlesDiv.appendChild(articleDiv);

    })
}