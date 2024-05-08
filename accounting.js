'use strict'

let departments = [];
let arrEmployees = [];

function loadData() {
    let data = localStorage.getItem("employees");
    if (data != null) {
        arrEmployees = JSON.parse(data);
    }
}

function department(dName, numOfEmployees, totalSalary) {
    this.dName = dName;
    this.numOfEmployees = numOfEmployees;
    this.totalSalary = totalSalary;
    this.avgSalary = null;

    departments.push(this);
}

department.prototype.calcAvgSalary = function () {
    this.avgSalary = Math.floor(this.totalSalary / this.numOfEmployees);
}

let administrationDep = new department("Administration", 0, 0);
let marketingDep = new department("Marketing", 0, 0);
let developmentDep = new department("Development", 0, 0);
let financeDep = new department("Finance", 0, 0);

let totalNumOfEmployees = 0;
let totalSalary = 0;
let totalAvgSalary = null;

function fillDepartmentAvgSalary() {
    for (let i = 0; i < departments.length; i++) {
        departments[i].calcAvgSalary();
    }

}

function fillDepartmentsInfo() {
    arrEmployees.forEach(employee => {

        switch (employee.department) {
            case "Administration":
                administrationDep.numOfEmployees++;
                administrationDep.totalSalary += employee.Salary;
                break;
            case "Marketing":
                marketingDep.numOfEmployees++;
                marketingDep.totalSalary += employee.Salary;
                break;
            case "Development":
                developmentDep.numOfEmployees++;
                developmentDep.totalSalary += employee.Salary;
                break;
            case "Finance":
                financeDep.numOfEmployees++;
                financeDep.totalSalary += employee.Salary;
                break;
        }
    });

    fillDepartmentAvgSalary();
}

function fillTotalInfo() {
    for (let i = 0; i < departments.length; i++) {
        totalNumOfEmployees += departments[i].numOfEmployees;
        totalSalary += departments[i].totalSalary;
    }
    totalAvgSalary = Math.floor(totalSalary / totalNumOfEmployees);
}

function renderDepartmentRow(department) {
    let numOfEmployeesEl = document.getElementById("num" + department.dName);
    numOfEmployeesEl.textContent = department.numOfEmployees;

    let totalSalaryEl = document.getElementById("total" + department.dName);
    totalSalaryEl.textContent = department.totalSalary;

    let avgSalaryEl = document.getElementById("avg" + department.dName);
    avgSalaryEl.textContent = department.avgSalary;
}

function renderTotalRow() {
    let totalNumOfEmployeesEl = document.getElementById("totalNum");
    totalNumOfEmployeesEl.textContent = totalNumOfEmployees;

    let totalSalaryEl = document.getElementById("totalSalary");
    totalSalaryEl.textContent = totalSalary;

    let totalAvgSalaryEl = document.getElementById("totalAvg");
    totalAvgSalaryEl.textContent = totalAvgSalary;
}

function renderTable() {
    for (let i = 0; i < departments.length; i++) {
        renderDepartmentRow(departments[i]);
    }

    renderTotalRow();
}

loadData();
if (arrEmployees.length > 0) {
    fillDepartmentsInfo();
    fillTotalInfo();
}
renderTable();









