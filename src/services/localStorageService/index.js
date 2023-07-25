class LocalStorageService {
  setItem(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  getItem() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  getPortfolios() {
    try {
      return JSON.parse(localStorage.getItem("portfolios"));
    } catch (error) {
      return [];
    }
  }

  setPortfolios(portfolios) {
    localStorage.setItem("portfolios", JSON.stringify(portfolios));
  }

  getPortfolio(portfolioId) {
    const portfolios = this.getPortfolios();
    return portfolios.find((portfolio) => portfolio.id === portfolioId);
  }

  addPortfolio(portfolio) {
    const portfolios = JSON.parse(localStorage.getItem("portfolios"));
    const isThere = portfolios?.find((item) => item.name === portfolio.name);
    if (isThere) throw new Error(`${isThere.name} already exist`);

    if (portfolios?.length > 0) {
      localStorage.setItem(
        "portfolios",
        JSON.stringify([...portfolios, portfolio])
      );
      return;
    }

    localStorage.setItem("portfolios", JSON.stringify([portfolio]));
  }

  deletePortfolio(id) {
    const portfolios = this.getPortfolios();
    const newPortfolios = portfolios.filter((portfolio) => portfolio.id !== id);

    this.setPortfolios(newPortfolios);
  }

  addStock(stock) {
    const portfolios = this.getPortfolios();
    const portfolio = this.getPortfolio(stock.portfolioId);
    portfolio.stocks.push(stock);

    const portfolioIndex = portfolios.findIndex(
      (portfolio) => portfolio.id === stock.portfolioId
    );
    portfolios.splice(portfolioIndex, 1, portfolio);
    this.setPortfolios(portfolios);
  }

  getStock(portfolioId, stockName) {
    const portfolio = this.getPortfolio(portfolioId);

    return portfolio.stocks.find((s) => s.name === stockName);
  }

  addStockjsonRecord(stock) {
    const portfolios = this.getPortfolios();
    const portfolio = this.getPortfolio(stock.portfolioId);

    portfolio.stocks.push(stock);

    portfolio.totalCost = portfolio.stocks
      .filter((stock) => stock.action === "Buy")
      .reduce((acc, stock) => acc + stock.totalCost, 0);

    portfolio.profitAndLoss = portfolio.stocks.reduce(
      (acc, stock) => acc + stock.profitAndLoss,
      0
    );

    this.setPortfolios([...portfolios, portfolio]);
  }

  replacePortfolio(portfolio) {
    const portfolios = this.getPortfolios();
    const portfolioIndex = portfolios.findIndex(
      (item) => item.id === portfolio.id
    );

    portfolios.splice(portfolioIndex, 1, portfolio);

    this.setPortfolios(portfolios);
  }

  deleteStock(portfolioId, stockId) {
    const portfolios = this.getPortfolios();
    const portfolio = this.getPortfolio(portfolioId);

    portfolio.stocks = portfolio.stocks.filter((stock) => stock.id !== stockId);

    const portfolioIndex = portfolios.findIndex(
      (portfolio) => portfolio.id === stockId
    );

    portfolios.splice(portfolioIndex, 1, portfolio);

    this.setPortfolios(portfolios);
  }
}

export default new LocalStorageService();
