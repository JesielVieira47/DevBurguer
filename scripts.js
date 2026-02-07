
const list = document.querySelector('ul');
const btnShowAll = document.querySelector('.btn-show-all');
const btnMap = document.querySelector('.btn-map');
const btnFilter = document.querySelector('.btn-filter');
const btnReduce = document.querySelector('.btn-reduce');


function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
}


function renderItems(items, title = '') {

    list.innerHTML = '';

    if (title) {
        list.insertAdjacentHTML('beforebegin', `<h2 class="section-title">${title}</h2>`);
    }

    if (items.length === 0) {
        list.innerHTML = '<p class="empty-message">Nenhum item encontrado</p>';
        return;
    }

    const html = items.map(item => `
        <li>
            <img src="${item.src}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p class="item-price">${formatPrice(item.price)}</p>
            ${item.vegan ? '<span class="vegan">Vegano 🌱</span>' : ''}
        </li>
    `).join('');

    list.innerHTML = html;
}


btnShowAll.addEventListener('click', () => {

    document.querySelectorAll('.section-title').forEach(el => el.remove());
    renderItems(menuOptions);
});


btnMap.addEventListener('click', () => {
    document.querySelectorAll('.section-title').forEach(el => el.remove());

    const newPrices = menuOptions.map(item => ({
        ...item,
        price: Number((item.price * 0.9).toFixed(2))
    }));

    renderItems(newPrices, 'Cardápio com 10% de desconto');
});


btnFilter.addEventListener('click', () => {
    document.querySelectorAll('.section-title').forEach(el => el.remove());

    const veganos = menuOptions.filter(item => item.vegan);

    renderItems(veganos, 'Opções Veganas');
});


btnReduce.addEventListener('click', () => {
    document.querySelectorAll('.section-title').forEach(el => el.remove());

    const total = menuOptions.reduce((acc, item) => acc + item.price, 0);

    list.innerHTML = `
        <li class="total-card">
            <h2>Valor total do cardápio</h2>
            <p class="total-price">${formatPrice(total)}</p>
            <small>(${menuOptions.length} itens no menu)</small>
        </li>
    `;
});