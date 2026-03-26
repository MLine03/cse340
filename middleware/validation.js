exports.validateClassification = (req, res, next) => {
    const { classification_name } = req.body;
    const errors = [];
    if (!classification_name.match(/^[a-zA-Z0-9]+$/)) {
        errors.push('Classification must contain only letters and numbers.');
    }
    if (errors.length > 0) {
        req.flash('errors', errors);
        req.flash('oldInput', req.body);
        return res.redirect('/inv/add-classification');
    }
    next();
};

exports.validateInventory = (req, res, next) => {
    const errors = [];
    const { inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color, classification_id } = req.body;

    if (!inv_make) errors.push('Make is required.');
    if (!inv_model) errors.push('Model is required.');
    if (!inv_year || isNaN(inv_year)) errors.push('Year must be a number.');
    if (!inv_price || isNaN(inv_price)) errors.push('Price must be a number.');
    if (!inv_miles || isNaN(inv_miles)) errors.push('Miles must be a number.');
    if (!inv_color) errors.push('Color is required.');
    if (!classification_id) errors.push('Classification is required.');

    if (errors.length > 0) {
        req.flash('errors', errors);
        req.flash('oldInput', req.body);
        return res.redirect('/inv/add-inventory');
    }
    next();
};