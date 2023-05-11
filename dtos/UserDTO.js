module.exports = class UserDto
{
    email;
    id;
    isActivated;
    name;
    lastname;
    username;

    constructor(model)
    {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.name = model.name;
        this.lastname = model.lastname;
        this.username = model.username;
    }
}