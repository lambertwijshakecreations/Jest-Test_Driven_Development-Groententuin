const {
	getYieldForPlant,
	getYieldForCrop,
	getTotalYield,
	getCostsForCrop,
	getRevenueForCrop,
	getProfitForCrop,
	getTotalProfit
} = require("./farm");

describe("getYieldForPlant", () => {
	const corn = {
		name: "corn",
		yield: 30
	};

	test("Get yield for plant with no environment factors", () => {
		expect(getYieldForPlant(corn)).toBe(30);
	});

	test("Get yield for plant with environment sun LOW", () => {
		const corn = {
			name: "corn",
			yield: 30,
			factors: {
				sun: {
					low: -50,
					medium: 0,
					high: 50
				}
			}
		};
		const environmentFactors = {
			sun: "low"
		};
		expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
	});

	test("Get yield for plant with environment wind high", () => {
		const corn = {
			name: "corn",
			yield: 30,
			factors: {
				wind: {
					low: 0,
					medium: -20,
					high: -50
				}
			}
		};
		const environmentFactors = {
			wind: "high"
		};
		expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
	});

	test("Get yield for plant with environment sun & Wind", () => {
		const corn = {
			name: "corn",
			yield: 30,
			factors: {
				sun: {
					low: -50,
					medium: 0,
					high: 50
				},
				wind: {
					low: 0,
					medium: -20,
					high: -50
				}
			}
		};
		const environmentFactors = {
			sun: "low",
			wind: "medium"
		};
		expect(getYieldForPlant(corn, environmentFactors)).toBe(24);
	});
});

describe("getYieldForCrop", () => {
	test("Get yield for crop, simple", () => {
		const corn = {
			name: "corn",
			yield: 3
		};
		const input = {
			crop: corn,
			numCrops: 10
		};
		expect(getYieldForCrop(input)).toBe(30);
	});
});

describe("getTotalYield", () => {
	test("Calculate total yield with multiple crops", () => {
		const corn = {
			name: "corn",
			yield: 3
		};
		const pumpkin = {
			name: "pumpkin",
			yield: 4
		};
		const crops = [
			{ crop: corn, numCrops: 5 },
			{ crop: pumpkin, numCrops: 2 }
		];
		expect(getTotalYield({ crops })).toBe(23);
	});

	test("Calculate total yield with 0 amount", () => {
		const corn = {
			name: "corn",
			yield: 3
		};
		const crops = [{ crop: corn, numCrops: 0 }];
		expect(getTotalYield({ crops })).toBe(0);
	});
});

describe("getCostsForCrop", () => {
	test("Get cost for crop", () => {
		const corn = {
			name: "corn",
			yield: 3,
			costs: 1
		};
		const numberOfCrops = {
			crop: corn,
			numCrops: 10
		};
		expect(getCostsForCrop(numberOfCrops)).toBe(10);
	});
});

describe("getRevenueForCrop", () => {
	test("Get revenue from crop", () => {
		const corn = {
			name: "corn",
			yield: 3,
			costs: 1,
			salePrice: 3
		};
		const input = {
			crop: corn,
			numCrops: 10
		};
		expect(getRevenueForCrop(input)).toBe(90);
	});

	test("Get revenue from no crops", () => {
		const corn = {
			name: "corn",
			yield: 3,
			costs: 1,
			salePrice: 3
		};
		const input = {
			crop: corn,
			numCrops: 0
		};
		expect(getRevenueForCrop(input)).toBe(0);
	});

	test("Get revenue from crop with environment sun", () => {
		const corn = {
			name: "corn",
			yield: 3,
			costs: 1,
			salePrice: 3,
			factors: {
				sun: {
					low: -50,
					medium: 0,
					high: 50
				}
			}
		};
		const input = {
			crop: corn,
			numCrops: 10
		};
		const environmentFactors = {
			sun: "low"
		};
		expect(getRevenueForCrop(input, environmentFactors)).toBe(45);
	});
});

//getProfitForCrop

//This is a test for getting the Profit of crops
describe("getProfitForCrop", () => {
	test("Calculate profit from crop", () => {
		const corn = {
			name: "corn",
			yield: 3,
			costs: 1,
			salePrice: 3
		};
		const input = {
			crop: corn,
			numCrops: 10
		};
		expect(getProfitForCrop(input)).toBe(80);
	});
	//This is a test for Profit with environment

	test("Calculate profit from crop with environment factor sun", () => {
		const corn = {
			name: "corn",
			yield: 3,
			costs: 1,
			salePrice: 3,
			factors: {
				sun: {
					low: -50,
					medium: 0,
					high: 50
				}
			}
		};
		const input = {
			crop: corn,
			numCrops: 10
		};
		const environmentFactors = {
			sun: "low"
		};
		expect(getProfitForCrop(input, environmentFactors)).toBe(35);
	});
});

//getTotalProfit
//This is a test for getting the total Profit of crops
describe("getTotalProfit", () => {
	test("Calculate total profit with multiple crops", () => {
		const corn = {
			name: "corn",
			yield: 3,
			costs: 1,
			salePrice: 3
		};
		const pumpkin = {
			name: "pumpkin",
			yield: 4,
			costs: 2,
			salePrice: 4
		};
		const crops = [
			{ crop: corn, numCrops: 5 },
			{ crop: pumpkin, numCrops: 2 }
		];
		expect(getTotalProfit({ crops })).toBe(68);
	});

	test("Calculate total profit with multiple crops with environment", () => {
		const corn = {
			name: "corn",
			yield: 3,
			costs: 1,
			salePrice: 3,
			factors: {
				sun: {
					low: -50,
					medium: 0,
					high: 50
				}
			}
		};
		const pumpkin = {
			name: "pumpkin",
			yield: 4,
			costs: 2,
			salePrice: 4,
			factors: {
				sun: {
					low: -50,
					medium: 0,
					high: 50
				}
			}
		};
		const crops = [
			{ crop: corn, numCrops: 5 },
			{ crop: pumpkin, numCrops: 2 }
		];
		const environmentFactors = {
			sun: "low"
		};
		expect(getTotalProfit({ crops }, environmentFactors)).toBe(29.5);
	});
});
