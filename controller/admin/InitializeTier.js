const { TierSchema } = require("../models/tier");
const constants = require('../../constant/constant')
const InitializeTier = async (req, res) => {
    try {
        const { tier1,tier2 } = req.body;
        const flag = 1
        let existingRecords = await TierSchema.findOne({ flag });

        if (!existingRecords) {
            existingRecords = new TierSchema({ tier1,tier2, flag });
        } else {
            existingRecords.tier1 = tier1;
            existingRecords.tier2 = tier2;
        }

        const result = await existingRecords.save();

        return ({
            code: 200,
            message: existingRecords.isNew
                ? constants.newRecords
                : constants.updatedRecords,
            data: result,
        });
    } catch (error) {
        console.error("API Error:", error);
        if (error.name === "ValidationError") {
            return ({
                code: 400,
                message: "Bad Request - Validation error",
                error: error.message,
            });
        } else {
            return ({
                code: 500,
                message: 'Internal Server Error - An error occurred while processing your request',
                error: error.message,
            });
        }
    }

}
const GetTier = async (req, res) => {
    try {
        const tiers = await TierSchema.find();
        console.log("API resut for tiers", tiers);
        return {
            code: 200,
            message: 'Success - Get tier data ',
            data: tiers,
        };
    } catch (error) {
        console.error("API Error:", error);
        if (error.name === "ValidationError") {
            return {
                code: 400,
                message: "Bad Request - Validation error",
                error: error.message,
            };
        } else {
            return {
                code: 500,
                message: 'Internal Server Error - An error occurred while processing your request',
                error: error.message,
            };
        }
    }

}

module.exports = {
    InitializeTier,
    GetTier,
};

