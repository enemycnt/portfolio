import fs from "node:fs/promises";
import { main } from "../src/main";

jest.mock("../src/constants", () => ({
  INPUT_TX_PATH: "./inputs/input_txs1.json",
  INPUT_FLOORPRICES_PATH: "./inputs/input_floor_prices1.json",
  OUTPUT_WALLETS_PATH: "./outputs/result1.json",
}));

describe("main function", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should read input transactions and floor price items, merge and process them", async () => {
    await main();
    const result = await fs.readFile("./outputs/result1.json", {
      encoding: "utf8",
    });
    const resultParsed = JSON.parse(result);
    const expectedData = [
      {
        time: 1,
        wallet: "3e2A1hrt33rBfzRupkeECYSPUPL44A3wLXtF6dSoEhnn",
        realized: 0,
        unrealized: -4.1,
      },
      {
        time: 3,
        wallet: "3e2A1hrt33rBfzRupkeECYSPUPL44A3wLXtF6dSoEhnn",
        realized: 0,
        unrealized: 19,
      },
      {
        time: 4,
        wallet: "8xYbB77k9zKFqg13b1P2iEC2fbeboAjWS3GL4AKJBwfZ",
        realized: 0,
        unrealized: 0,
      },
      {
        time: 5,
        wallet: "8xYbB77k9zKFqg13b1P2iEC2fbeboAjWS3GL4AKJBwfZ",
        realized: 6,
        unrealized: 29,
      },
      {
        time: 5,
        wallet: "3e2A1hrt33rBfzRupkeECYSPUPL44A3wLXtF6dSoEhnn",
        realized: -10,
        unrealized: 13,
      },
      {
        time: 15,
        wallet: "8xYbB77k9zKFqg13b1P2iEC2fbeboAjWS3GL4AKJBwfZ",
        realized: 6,
        unrealized: 7,
      },
    ];
    expect(resultParsed).toStrictEqual(expectedData);
  });
});
