import toolbox from "./toolbox";

export const calculatePurchaseAndPostSaleSummary = (records) => {
  let tempRemainderOfPurchases = {
    remaininPiece: 0,
    remaininAverage: 0,
    totalProfitAndLoss: 0,
  };

  let totalCost, totalPiece, averageCost, profitAndLoss;
  records.forEach((transaction) => {
    let remainderOfPurchases = { totalPiece: 0, totalCost: 0 };
    if (transaction.action === "Buy") {
      remainderOfPurchases.totalPiece += transaction.piece;
      remainderOfPurchases.totalCost += transaction.cost;

      transaction.totalCost =
        transaction.piece * transaction.cost + transaction.commission;
    }

    const remainingTotalPurchasedPiece =
      remainderOfPurchases.totalPiece + tempRemainderOfPurchases.remaininPiece;

    const remainingTotalPurchasedAverage =
      remainderOfPurchases.totalCost * remainderOfPurchases.totalPiece +
      tempRemainderOfPurchases.remaininPiece *
        tempRemainderOfPurchases.remaininAverage;

    tempRemainderOfPurchases.remaininPiece = remainingTotalPurchasedPiece;
    tempRemainderOfPurchases.remaininAverage =
      remainingTotalPurchasedAverage / remainingTotalPurchasedPiece;

    if (transaction.action === "Sell") {
      const averageCostOfPartsSold = transaction.piece * transaction.cost;
      // * Kar yüzdesi
      const profitAndLossPercent = toolbox.calculatePercent(
        averageCostOfPartsSold,
        tempRemainderOfPurchases.remaininAverage * transaction.piece
      );

      const profitAndLoss = parseFloat(
        (
          averageCostOfPartsSold -
          tempRemainderOfPurchases.remaininAverage * transaction.piece
        ).toFixed(2)
      );

      const remainingPieceAmount =
        remainingTotalPurchasedPiece - transaction.piece;

      tempRemainderOfPurchases.remaininAverage =
        remainingPieceAmount === 0
          ? 0
          : remainingTotalPurchasedAverage / remainingTotalPurchasedPiece;

      tempRemainderOfPurchases.remaininPiece = remainingPieceAmount;

      remainderOfPurchases.totalPiece = 0;
      remainderOfPurchases.totalCost = 0;

      transaction.profitAndLossPercent = profitAndLossPercent;
      transaction.profitAndLoss = profitAndLoss;
      transaction.totalCost = averageCostOfPartsSold - transaction.commission;
      tempRemainderOfPurchases.totalProfitAndLoss += profitAndLoss;
    }

    totalCost = parseFloat(
      (
        tempRemainderOfPurchases.remaininAverage *
        tempRemainderOfPurchases.remaininPiece
      ).toFixed(2)
    );

    totalPiece = parseFloat(tempRemainderOfPurchases.remaininPiece.toFixed(2));
    averageCost = parseFloat(
      tempRemainderOfPurchases.remaininAverage.toFixed(2)
    );
    profitAndLoss = parseFloat(
      tempRemainderOfPurchases.totalProfitAndLoss.toFixed(2)
    );
  });

  return { totalCost, totalPiece, averageCost, profitAndLoss };
};
