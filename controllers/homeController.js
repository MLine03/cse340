// controllers/homeController.js
export const getHome = (req, res) => {
    res.render('home', { title: 'Home Page' });
};