Feature('Unliking Restaurants');

Before( async ({ I }) => {
    I.amOnPage('/');
    I.waitForElement('.restoTitle a', 10);
    I.seeElement('.restoTitle a');
    const firstResto = locate('.restoTitle a').first();
    I.click(firstResto);

    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.waitForElement('.restoTitle a', 10);
    I.seeElement('.restoTitle a')
  });

Scenario('showing liked restaurant',  ({ I }) => {
    I.amOnPage('/#/favorite');  
    I.seeElement('.listResto');
});

Scenario('unliking one restaurant',  ({ I }) => {
    I.amOnPage('/#/favorite');  
    I.waitForElement('.restoTitle a', 10);
    I.seeElement('.restoTitle a');
    const firstResto = locate('.restoTitle a').first();
    I.click(firstResto);

    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');  
    I.see('Anda belum memiliki daftar Favorit');
});
