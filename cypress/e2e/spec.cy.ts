import { BASE_URL } from './../../src/utils/api';

const selectors = {
	orderButton: '[data-testid="order-button"]',
	modal: '[data-testid="modal"]',
	modalClose: '[data-testid="modal-close"]',
	burgerIngredientsTab: '[class^="burger-ingredients_tabContent"]',
	ingredientName: '[class^="ingredient-item_name"]',
	ingredientsDetailsModalName: '[class^="ingredients-details_modalName"]',
	ingredientsDetailsList: '[class^=ingredients-details_list]',
	counterNum: '[class^="counter__num"]',
	burgerConstructorList: '[class^="burger-constructor_list"]',
	burgerConstructorOrderTotal: '[class^="burger-constructor_orderTotal"]',
	constructorElement: '.constructor-element',
};

describe('home page test', () => {
	beforeEach(() => {
		cy.intercept('GET', `${BASE_URL}/auth/user`, { fixture: 'user.json' });
		cy.intercept('POST', `${BASE_URL}/orders`, { fixture: 'order.json' }).as('postOrder');
		cy.intercept('GET', `${BASE_URL}/ingredients`, { fixture: 'ingredients.json' }).as(
			'ingredients',
		);
		cy.fixture('order.json').then((data) => {
			cy.wrap(data).as('order');
		});

		window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
		window.localStorage.setItem('accessToken', JSON.stringify('test-accessToken'));

		cy.log('Переходим на главную страницу');
		cy.visit('/');
	});

	it('should not open order details modal', () => {
		cy.get(selectors.orderButton).click();
		cy.get(selectors.modal).should('not.exist');
	});

	it('should open ingredient details modal with first bun data', () => {
		cy.get(selectors.burgerIngredientsTab)
			.contains('Булки')
			.parent()
			.find('li:first-child a')
			.click();
		cy.get(selectors.modal).should('exist').find('img').should('exist');
		cy.get(selectors.ingredientsDetailsModalName)
			.should('exist')
			.and('have.text', 'Краторная булка N-200i 123');

		cy.get(`${selectors.ingredientsDetailsList} > :nth-child(1) > .text`).should(
			'have.text',
			'420',
		);
		cy.get(`${selectors.ingredientsDetailsList} > :nth-child(2) > .text`).should(
			'have.text',
			'80',
		);
		cy.get(`${selectors.ingredientsDetailsList} > :nth-child(3) > .text`).should(
			'have.text',
			'24',
		);
		cy.get(`${selectors.ingredientsDetailsList} > :nth-child(4) > .text`).should(
			'have.text',
			'53',
		);

		cy.log('Нажимаем на кнопку закрытия модального окна и проверяем');
		cy.get(selectors.modalClose).click();
		cy.get(selectors.modal).should('not.exist');
	});

	it('should make order', () => {
		cy.contains('Соберите бургер');

		cy.get(selectors.burgerIngredientsTab)
			.contains('Булки')
			.parent()
			.find('li:first-child a')
			.as('bun');

		cy.log('Перетаскиваем булку и дропаем в начинки');
		cy.get('@bun').trigger('dragstart');
		cy.contains('Выберите начинку').trigger('drop');

		cy.log('Проверка: булка не должна появиться');
		cy.get('@bun').find(selectors.counterNum).should('not.exist');
		cy.contains('Выберите булки').should('exist');

		cy.log('Перетаскиваем булку в корректный элемент');
		cy.get('@bun').trigger('dragstart');
		cy.contains('Выберите булки').trigger('drop');

		cy.log(
			'Проверка: булка должна появиться и измениться счётчик в списке, цена должна измениться',
		);
		cy.get('@bun').find(selectors.counterNum).should('have.text', '2');
		cy.get(selectors.burgerConstructorOrderTotal).should('not.be.a', '0');

		cy.log('Перетаскиваем начинку в корректный элемент');
		cy.get(selectors.burgerIngredientsTab)
			.contains('Соусы')
			.parent()
			.find('li:first-child a')
			.as('ingredient-1')
			.trigger('dragstart');
		cy.contains('Выберите начинку').trigger('drop');

		cy.log('Проверка: начинка должна появиться и измениться счётчик в списке');
		cy.get('@ingredient-1').find(selectors.counterNum).should('have.text', '1');

		cy.log('Перетаскиваем такую же начинку в корректный элемент');
		cy.get('@ingredient-1').trigger('dragstart');
		cy.get(selectors.burgerConstructorList)
			.find(selectors.constructorElement)
			.should('have.length', 1);
		cy.get(selectors.burgerConstructorList).find(selectors.constructorElement).trigger('drop');

		cy.log('Проверка: начинка должна появиться и счетчик должен показать 2');
		cy.get('@ingredient-1').find(selectors.counterNum).should('have.text', '2');

		cy.log('Нажимаем на кнопку удаления ингредиента из конструктора');
		cy.get(selectors.burgerConstructorList)
			.find(selectors.constructorElement)
			.find('.constructor-element__action')
			.last()
			.trigger('click');

		cy.log('Проверка: начинка должна удалиться и счетчик должен показать 1');
		cy.get('@ingredient-1').find(selectors.counterNum).should('have.text', '1');

		cy.log('Перетаскиваем новую начинку и дропаем её в начало');
		cy.get(selectors.burgerIngredientsTab)
			.contains('Начинки')
			.parent()
			.find('li:last-child a')
			.as('ingredient-2')
			.trigger('dragstart');

		cy.get('@ingredient-2').then((ingredient) => {
			let ingredientName;
			ingredientName = Cypress.$(ingredient).find(selectors.ingredientName).text();
			cy.log('ingredientName: ', ingredientName);

			cy.get(selectors.burgerConstructorList)
				.find(selectors.constructorElement)
				.then((element) => {
					const rect = Cypress.$(element)[0].getBoundingClientRect();

					cy.wrap(element).trigger('drop', { clientX: rect.x + 1, clientY: rect.y + 1 });

					cy.log('Проверяем добавился ли ингредиент в начало списка с начинками');
					cy.get(selectors.burgerConstructorList)
						.find(selectors.constructorElement)
						.first()
						.should('contain', ingredientName);
				});
		});

		cy.log('Перетаскиваем новую начинку и дропаем её в конец');
		cy.get(selectors.burgerIngredientsTab)
			.contains('Соусы')
			.parent()
			.find('li:last-child a')
			.as('ingredient-3')
			.trigger('dragstart');

		cy.get('@ingredient-3').then((ingredient) => {
			let ingredientName;
			ingredientName = Cypress.$(ingredient).find(selectors.ingredientName).text();
			cy.log('ingredientName: ', ingredientName);

			cy.get(selectors.burgerConstructorList)
				.find(selectors.constructorElement)
				.eq(-1)
				.then((element) => {
					const rect = Cypress.$(element)[0].getBoundingClientRect();

					// курсор на нижней части элемента для дропа после него
					cy.wrap(element).trigger('drop', {
						clientX: rect.x + 1,
						clientY: rect.bottom - 1,
					});

					cy.log('Проверяем добавился ли ингредиент в конец списка с начинками');
					cy.get(selectors.burgerConstructorList)
						.find(selectors.constructorElement)
						.last()
						.should('contain', ingredientName);
				});
		});

		cy.log('Перетаскиваем последний ингредиент (начинку) конструктора на первое место');
		cy.get(selectors.burgerConstructorList)
			.find(selectors.constructorElement)
			.eq(-1)
			.as('ingredient-4')
			.trigger('dragstart');

		cy.get('@ingredient-4').then((ingredient) => {
			let ingredientName;
			ingredientName = Cypress.$(ingredient).find(selectors.ingredientName).text();
			cy.log('ingredientName: ', ingredientName);

			cy.get(selectors.burgerConstructorList)
				.find(selectors.constructorElement)
				.first()
				.then((element) => {
					const rect = Cypress.$(element)[0].getBoundingClientRect();

					// курсор на верхней части элемента для дропа до него
					cy.wrap(element).trigger('drop', {
						clientX: rect.x + 1,
						clientY: rect.top + 1,
					});

					cy.log('Проверяем передвинулся ли ингредиент в начало списка с начинками');
					cy.get(selectors.burgerConstructorList)
						.find(selectors.constructorElement)
						.first()
						.should('contain', ingredientName);
				});
		});

		cy.log('Нажимаем на кнопку "Оформить заказ"');
		cy.get(selectors.orderButton).click();
		cy.log('Проверяем открылось ли модальное окно и соответствует ли номер заказа');
		cy.get(selectors.modal).should('exist');
		cy.get('@order').then((res: Record<string, any>) => {
			cy.log('order', res);
			cy.get('[data-testid="order-number"]').should('have.text', res.order.number);
		});

		cy.log('Нажимаем на кнопку закрытия модального окна и проверяем');
		cy.get(selectors.modalClose).click();
		cy.get(selectors.modal).should('not.exist');
	});
});
