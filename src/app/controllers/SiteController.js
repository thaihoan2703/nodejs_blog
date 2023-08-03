class SiteController {
    index(req, res) {
        //[GET] /
        res.render('home');
    }
    //[GET] /search
    search(req, res) {
        res.render('partials/search');
    }
}

module.exports = new SiteController();
