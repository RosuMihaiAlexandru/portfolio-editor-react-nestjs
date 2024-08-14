import { makeAutoObservable } from "mobx";


class PortfolioStore {
  portfolios = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPortfolios() {
    // Fetch items from the API
    const response = await fetch("http://localhost:5000/portfolios");
    const data = await response.json();
    this.portfolios = data;
  }

  async addPortfolio(newPortfolio: FormData) {
    // Add a new item to the API
    try {
      await fetch("http://localhost:5000/portfolios", {
        method: "POST",
        body: newPortfolio
      });
      this.fetchPortfolios();
    } catch (error) {
      console.error('Error uploading portfolio item:', error);
      alert('Failed to add portfolio item. Please try again.');
    }
    this.fetchPortfolios();
  }

  async updateItem(updatedItem: any) {
    // Update an existing item in the API
    await fetch(`http://localhost:5000/portfolios/updateOnePortfolios?id=${updatedItem.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.fetchPortfolios();
  }

  // async deleteItem(itemId: any) {
  //   // Delete an item from the API
  //   await fetch(`http://localhost:5000/portfolios/${itemId}`, {
  //     method: "DELETE",
  //   });
  //   this.portfolios = this.portfolios.filter((item) => item.id !== itemId);
  // }
}

const portfolioStore = new PortfolioStore();

export default portfolioStore;
