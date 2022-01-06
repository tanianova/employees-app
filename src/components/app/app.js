import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, name: "John C.", salary: 800, increase: true, rise: true },
        { id: 2, name: "Alex M.", salary: 1000, increase: false, rise: false },
        { id: 3, name: "Carl W.", salary: 4500, increase: false, rise: false },
      ],
    };
    this.newId = 4;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      //first method
      //   const index = data.findIndex((elem) => elem.id === id);
      //   const before = data.slice(0,index);
      //   const after = data.slice(index+1);
      //   const newArr = [...before,...after]

      const newArr = data.filter((item) => item.id !== id);
      return {
        data: newArr,
      };
    });
  };

  createItem = (name, salary) => {
    const newItem = {
      name: name,
      salary: salary,
      increase: false,
      rise: false,
      id: this.newId++,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToggleProp=(id,prop)=>{
          this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  }

//   onToggleIncrease = (id) => {
    //first method выдергиваем рандомный объект из рандомного места
    // this.setState(({ data }) => {
    //   const index = data.findIndex((elem) => elem.id === id);
    //   const old = data[index];
    //   const newItem = { ...old, increase: !old.increase };
    //   const newArr = [
    //     ...data.slice(0, index),
    //     newItem,
    //     ...data.slice(index + 1),
    //   ];
    //   return {
    //     data: newArr,
    //   };
    // });

    //второй метод
//     this.setState(({ data }) => ({
//       data: data.map((item) => {
//         if (item.id === id) {
//           return { ...item, increase: !item.increase };
//         }
//         return item;
//       }),
//     }));
//   };

  render() {
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;

    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />
        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>
        <EmployeesList
          data={this.state.data}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onCreate={this.createItem} />
      </div>
    );
  }
}

export default App;
