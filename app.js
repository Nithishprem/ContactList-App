// Contact class

class Contact{
    constructor(name, number){
        this.name = name;
        this.number = number;
    }
}

// UI class
class UI {
    static displayContacts(){
        let contacts = Store.getContacts();

        contacts.forEach(contact => {
            UI.addContactToList(contact);         
        });

    }

    static addContactToList(contact) {

        let row =document.createElement('tr');

            row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.number}</td>
            <td><a href="#" class ="btn delete"><i class="fas fa-trash"></i></a></td>
            `;
            document.querySelector('tbody').appendChild(row);
    }

    static deleteContact(el) {
        
        if(el.target.classList.contains('delete')) {
            el.target.parentElement.parentElement.remove();

            const name = el.target.parentElement.previousElementSibling.previousElementSibling.textContent;
            Store.removeContact(name);
            UI.showAlert("Contacted Removed", "success");
        }


    }

    static searchContacts(el) {
        let text = el.value.toLowerCase();
        console.log(text);

        let con_list = Array.from(document.querySelector('tbody').children);
        

        con_list.forEach((row) =>{
            if(row.firstElementChild.textContent.toLowerCase().indexOf(text) == -1){
                row.style.display = 'none';
            } else{
                row.style.display = '';
            }
        })

    }

    static showAlert(message, alert) {
        let formContainer = document.querySelector('.form-container');
        let form = document.getElementById('contact-form');
        let div = document.createElement('div');
        div.textContent = message;
        div.className = alert;

        formContainer.insertBefore(div, form);

        setTimeout(() =>div.remove(),3000);
    }

    static clearFeilds() {
        document.querySelector('#nameInput').value = '';
        document.querySelector('#numberInput').value = '';

    }

}

// store class

class Store{

    static getContacts() {
        let contacts = localStorage.getItem('contacts');

        if (contacts === null){
            return [];
        } else {
            return JSON.parse(contacts);
        }
    }

    static addContact(contact) {
        const contacts = Store.getContacts();

        contacts.push(contact);

        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    static removeContact(name) {
            const contacts = Store.getContacts();
        contacts.forEach((contact,i )=> {
            if (contact.name == name) {
                console.log(name)
                contacts.splice(i,1);
            }
            localStorage.setItem('contacts', JSON.stringify(contacts));  
        });
        }
        
        
    
}


document.addEventListener('DOMContentLoaded', e => UI.displayContacts());

const form = document.getElementById('contact-form');

form.addEventListener('submit', e =>{
    e.preventDefault();
    

    let name = document.querySelector('#nameInput').value;
    let number = document.querySelector('#numberInput').value;
    

    if (name == ''|| number == ''){
        UI.showAlert('please fill all Fields', 'error');
    }

    else{      
        let contact1 = new Contact(name,number);
        UI.addContactToList(contact1);
        Store.addContact(contact1);
        UI.showAlert("Contacted Added Sucessfully", "success");
        UI.clearFeilds();

    }

    

});

document.querySelector('.table').addEventListener('click', e=>{

    UI.deleteContact(e);
    
})

document.querySelector('.container-1').lastElementChild.addEventListener('keyup', (e) =>{
    UI.searchContacts(e.target);
});






