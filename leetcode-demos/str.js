var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        console.log(this)
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());