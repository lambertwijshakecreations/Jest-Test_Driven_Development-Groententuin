//Get yield for plant with no environment factors
const getYieldForPlant = (plant, environmentFactors = {}) => {
	let factor = 1;
	if (
		environmentFactors.hasOwnProperty("sun") &&
		plant.factors.hasOwnProperty("sun")
	) {
		factor = (plant.factors.sun[environmentFactors.sun] + 100) / 100;
	}
	if (
		environmentFactors.hasOwnProperty("wind") &&
		plant.factors.hasOwnProperty("wind")
	) {
		factor = (plant.factors.wind[environmentFactors.wind] + 100) / 100;
	}
	return plant.yield * factor;
};

//Get yield for crop, simple
const getYieldForCrop = (input, environmentFactors) => {
	const numOfCrops = input.numCrops;
	const price = getYieldForPlant(input.crop, environmentFactors);
	return numOfCrops * price;
};

const getTotalYield = ({ crops }, environmentFactors) => {
	const totalYield = crops
		.map((crop) => getYieldForCrop(crop, environmentFactors))
		.reduce((acc, cur) => acc + cur);
	return totalYield;
};

//Get cost for crop
const getCostsForCrop = (input) => {
	const numOfCrops = input.numCrops;
	const price = input.crop.costs;
	return numOfCrops * price;
};

//Get revenue from crop
const getRevenueForCrop = (input, environmentFactors) => {
	const salePriceCrop = input.crop.salePrice; //3
	return getYieldForCrop(input, environmentFactors) * salePriceCrop;
};

//Calculate profit from crop
const getProfitForCrop = (input, environmentFactors) => {
	const cropCosts = getCostsForCrop(input); //10
	const cropSalePrise = getRevenueForCrop(input, environmentFactors); //90
	return cropSalePrise - cropCosts;
};

// Calculate total profit with multiple crops
const getTotalProfit = ({ crops }, environmentFactors) => {
	const totalProfit = crops
		.map((crop) => getProfitForCrop(crop, environmentFactors))
		.reduce((acc, cur) => acc + cur);
	return totalProfit;
};

module.exports = {
	getYieldForPlant,
	getYieldForCrop,
	getTotalYield,
	getCostsForCrop,
	getRevenueForCrop,
	getProfitForCrop,
	getTotalProfit
};
