'use strict'
let employees = [];
let employeeIdCounter = 999;
const employeeCards = document.getElementById("employeeCards");
const myForm = document.getElementById("employeeForm");


function employee(FullName, Department, Level, ImageURL) {
    this.employeeID = null;
    this.fullName = FullName;
    this.department = Department;
    this.level = Level;
    this.imageURL = ImageURL;
    this.Salary = null;
    this.netSalary();
    this.generateEmployeeID();
    this.render();

    employees.push(this);
}


employee.prototype.generateEmployeeID = function () {
    this.employeeID = ++employeeIdCounter;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcSalary(level) {
    switch (level) {
        case "Senior":
            return getRandomNumber(1500, 2000);
        case "Mid-Senior":
            return getRandomNumber(1000, 1500);
        case "Junior":
            return getRandomNumber(500, 1000);
    }
}

employee.prototype.netSalary = function () {

    let salary = calcSalary(this.level);
    this.Salary = Math.floor(salary - (salary * 0.075));
}

employee.prototype.render = function () {
    let employeeCardEl = document.createElement('fieldset');

    let imageEl = document.createElement('img');
    imageEl.src = this.imageURL;
    employeeCardEl.appendChild(imageEl);

    let idEl = document.createElement('p');
    idEl.textContent = `ID: ${employeeIdCounter}`;
    employeeCardEl.appendChild(idEl);

    let fullNameEl = document.createElement('p');
    fullNameEl.textContent = `Name: ${this.fullName}`;
    employeeCardEl.appendChild(fullNameEl);

    let departmentEl = document.createElement('p');
    departmentEl.textContent = `Department: ${this.department}`;
    employeeCardEl.appendChild(departmentEl);

    let levelEl = document.createElement('p');
    levelEl.textContent = `Level: ${this.level}`;
    employeeCardEl.appendChild(levelEl);

    let salaryEl = document.createElement('p');
    salaryEl.textContent = `Salary: ${this.Salary}`;
    employeeCardEl.appendChild(salaryEl);

    employeeCards.appendChild(employeeCardEl);
}

myForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    let fullName = event.target.fullName.value;
    let department = event.target.department.value;
    let level = event.target.level.value;
    let imageURL = event.target.imageUrl.value;

    let newEmployee = new employee(fullName, department, level, imageURL);

    event.target.reset();
    saveData(employees, "employees");
}

function saveData(data, key) {
    let stringifyData = JSON.stringify(data);
    localStorage.setItem(key, stringifyData);
}

function loadData(key) {
    let retrievedData = localStorage.getItem(key);

    if (retrievedData != null) {
        let arrEmployees = JSON.parse(retrievedData);
        arrEmployees.forEach(Employee => {
            new employee(Employee.fullName, Employee.department, Employee.level, Employee.imageURL);
        });
    }
}

function createEmployeesInstances() {
    let emp1 = new employee('Ghazi Samer', 'Administration', 'Senior', './image/person.png');
    let emp2 = new employee('Lana Ali', 'Finance', 'Senior', './image/person.png');
    let emp3 = new employee('Tamara Ayoub', 'Marketing', 'Senior', './image/person.png');
    let emp4 = new employee('Safi Walid', 'Administration', 'Mid-Senior', './image/person.png');
    let emp5 = new employee('Omar Zaid', 'Development', 'Senior', './image/person.png');
    let emp6 = new employee('Rana Saleh', 'Development', 'Junior', './image/person.png');
    let emp7 = new employee('Hadi Ahmad', 'Finance', 'Mid-Senior', './image/person.png');

}


createEmployeesInstances();
loadData("employees");

