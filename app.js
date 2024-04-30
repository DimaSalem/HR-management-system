'use strict'

let employees = [];

function employee(EmployeeID, FullName, Department, Level, ImageURL) {
    this.employeeID = EmployeeID;
    this.fullName = FullName;
    this.department = Department;
    this.level = Level;
    this.imageURL = ImageURL;
    this.Salary = this.netSalary();

    employees.push(this);
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
            return getRandomNumber(500, 1500);
    }
}

employee.prototype.netSalary = function () {

    let salary = calcSalary(this.level);
    this.Salary = Math.floor(salary - (salary * 0.075));
}

employee.prototype.render = function () {

    const employeeListElement = document.getElementById("employeeList");
    const listItem = document.createElement("li");
    listItem.innerHTML = `${this.fullName} (Net: $${this.Salary})`;

    employeeListElement.appendChild(listItem);
}

function createEmployeesInstances() {
    let emp1 = new employee(1000, 'Ghazi Samer', 'Administration', 'Senior', './image/person.png');
    let emp2 = new employee(1001, 'Lana Ali', 'Finance', 'Senior', './image/person.png');
    let emp3 = new employee(1002, 'Tamara Ayoub', 'Marketing', 'Senior', './image/person.png');
    let emp4 = new employee(1003, 'Safi Walid', 'Administration', 'Mid-Senior', './image/person.png');
    let emp5 = new employee(1004, 'Omar Zaid', 'Development', 'Senior', './image/person.png');
    let emp6 = new employee(1005, 'Rana Saleh', 'Development', 'Junior', './image/person.png');
    let emp7 = new employee(1006, 'Hadi Ahmad', 'Finance', 'Mid-Senior', './image/person.png');

}

function renderEmployees() {
    for (let i = 0; i < employees.length; i++) {
        employees[i].render();
    }
}

createEmployeesInstances();
renderEmployees();

