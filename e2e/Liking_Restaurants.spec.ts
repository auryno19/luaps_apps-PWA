import assert from "assert";

Feature('Liking Restaurants');

Before(({ I }) => {
    I.amOnPage('/');
  });

Scenario('showing empty liked restaurant', ({ I }) => {
    I.amOnPage('/#/favorite');  
    I.see('Anda belum memiliki daftar Favorit')
});

Scenario('liking one restaurant', async ({ I }) => {
    I.waitForElement('.restoTitle a', 10);
    I.seeElement('.restoTitle a');
    const firstResto = locate('.restoTitle a').first();
    const firstRestoName = await I.grabTextFrom(firstResto);
    I.click(firstResto);

    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.waitForElement('.restoTitle a', 10);
    I.seeElement('.restoTitle a');
    const likedRestoName = await I.grabTextFrom('.restoTitle a');
  
    assert.strictEqual(firstRestoName, likedRestoName);

  });
