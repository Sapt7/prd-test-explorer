import { SummaryType, TestCaseResponse } from "@/types";
import axiosInstance from "../axios";

export class CommonService {
  static async getSummary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    // const { data } = await axiosInstance.post<SummaryType>(
    //   "/summary/generate",
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );
    return {
      feature_count: 5,
      key_points: [
        "Surcharges are identified by comparing transaction authorization amount with settlement amount",
        "Surcharge identification is limited to specific Merchant Category Codes (MCCs) including Fuel, Government, Transit, Utilities, and Railways",
        "Configurable surcharge threshold percentage determines the upper cap of surcharge transaction value",
        "Waiver configuration allows bank users to set up automated waivers with parameters (Flat, Percentage, or Slab Based)",
        "Surcharge transactions are deducted from retail principal limit of customer accounts",
        "Surcharge waivers appear as separate credit entries on customer account statements",
        "Surcharges are treated similar to principal transactions for repayment apportionment (FIFO)",
        "Surcharges are included in billing amounts, total amount due, and minimum amount due",
        "Rewards are awarded for surcharge transactions as per transactional reward policy",
      ],
      summary:
        "This document outlines the policy framework for managing surcharge-specific waivers in Vegapay's Credit Card Management System. It defines how surcharges are identified, configured, and waived for specific merchant categories. The system will automatically identify surcharges by comparing authorization and settlement amounts, apply thresholds for specific merchant categories, and provide configurable waiver options for bank users.",
      title:
        "Vegapay - Credit Card Management System - Surcharge Management - v2.00",
    };
  }
  static async getTestData(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    // const { data } = await axiosInstance.post<TestCaseResponse>(
    //   "/test-case/generate",
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );
    return {
      test_cases: [
        {
          coverage:
            "Surcharge Identification, Merchant Category Code, Surcharge Threshold Percentage",
          description:
            "Verify surcharge identification for domestic transactions where settlement amount exceeds authorization amount for fuel MCC",
          expected_results: [
            "Transaction should be identified as having a surcharge",
            "Surcharge amount should be calculated as \u20b920 (Settlement amount - Authorization amount)",
            "The transaction should be deducted from retail principal limit",
            "The surcharge amount should appear on the customer statement with narration 'Surcharge'",
          ],
          id: "TC-CCMS-631-001",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with available credit limit",
            "Surcharge threshold percentage is configured as 2% for fuel MCC 5541",
          ],
          priority: "High",
          steps: [
            "Process an authorization transaction with MCC 5541 (Service Station) for amount \u20b91000",
            "Process settlement for the same transaction with amount \u20b91020 (2% higher than authorization)",
          ],
          test_type: "Manual",
        },
        {
          coverage:
            "Surcharge Identification, Surcharge Threshold Percentage, Surcharge Configuration",
          description:
            "Verify surcharge identification when settlement amount exceeds threshold percentage",
          expected_results: [
            "Transaction should be identified as having a surcharge",
            "Surcharge amount should be calculated as \u20b920 (Authorization amount * Surcharge Threshold Percentage)",
            "The transaction should be classified as 'Debit Transaction' for the remaining amount",
            "The surcharge amount should appear on the customer statement with narration 'Surcharge'",
          ],
          id: "TC-CCMS-631-002",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with available credit limit",
            "Surcharge threshold percentage is configured as 2% for government MCC 9311",
          ],
          priority: "High",
          steps: [
            "Process an authorization transaction with MCC 9311 (Tax Payments) for amount \u20b91000",
            "Process settlement for the same transaction with amount \u20b91030 (3% higher than authorization, exceeding threshold)",
          ],
          test_type: "Manual",
        },
        {
          coverage: "Surcharge Identification for International Transactions",
          description:
            "Verify surcharge identification for international transactions",
          expected_results: [
            "Transaction should be identified as having a surcharge",
            "Surcharge amount should be calculated correctly based on the difference",
            "The transaction should be deducted from retail principal limit",
            "The surcharge amount should appear on the customer statement with narration 'Surcharge'",
          ],
          id: "TC-CCMS-631-003",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with available credit limit",
            "Surcharge configuration is set up for international transactions",
          ],
          priority: "Medium",
          steps: [
            "Process an international authorization transaction with MCC 5541 for amount $100",
            "Process settlement for the same transaction with amount $102",
          ],
          test_type: "Manual",
        },
        {
          coverage: "Surcharge Waiver, Waiver Management, Flat Waiver Type",
          description: "Verify flat waiver configuration for surcharge",
          expected_results: [
            "Surcharge of \u20b920 should be identified",
            "Flat waiver of \u20b910 should be applied to the surcharge",
            "A credit entry of \u20b910 should appear on the customer statement",
            "Net surcharge amount of \u20b910 should be added to the total amount due",
          ],
          id: "TC-CCMS-631-004",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with available credit limit",
            "A flat waiver of \u20b910 is configured for MCC 5541",
          ],
          priority: "High",
          steps: [
            "Process an authorization transaction with MCC 5541 for amount \u20b91000",
            "Process settlement for the same transaction with amount \u20b91020",
            "Verify waiver application on the transaction",
          ],
          test_type: "Manual",
        },
        {
          coverage:
            "Surcharge Waiver, Waiver Management, Percentage Waiver Type",
          description: "Verify percentage waiver configuration for surcharge",
          expected_results: [
            "Surcharge of \u20b920 should be identified",
            "Percentage waiver of 50% (\u20b910) should be applied to the surcharge",
            "A credit entry of \u20b910 should appear on the customer statement",
            "Net surcharge amount of \u20b910 should be added to the total amount due",
          ],
          id: "TC-CCMS-631-005",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with available credit limit",
            "A percentage waiver of 50% is configured for MCC 9311 with minimum value of \u20b91",
          ],
          priority: "High",
          steps: [
            "Process an authorization transaction with MCC 9311 for amount \u20b91000",
            "Process settlement for the same transaction with amount \u20b91020",
            "Verify waiver application on the transaction",
          ],
          test_type: "Manual",
        },
        {
          coverage:
            "Surcharge Waiver, Waiver Management, Slab Based Waiver Type",
          description: "Verify slab based waiver configuration for surcharge",
          expected_results: [
            "Surcharge of \u20b920 should be identified",
            "Since surcharge falls within the configured slab (\u20b910-\u20b930), a waiver of \u20b95 should be applied",
            "A credit entry of \u20b95 should appear on the customer statement",
            "Net surcharge amount of \u20b915 should be added to the total amount due",
          ],
          id: "TC-CCMS-631-006",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with available credit limit",
            "A slab based waiver is configured for MCC 4112 with From Amount \u20b910, To Amount \u20b930, and Waiver Value \u20b95",
          ],
          priority: "High",
          steps: [
            "Process an authorization transaction with MCC 4112 for amount \u20b91000",
            "Process settlement for the same transaction with amount \u20b91020",
            "Verify waiver application on the transaction",
          ],
          test_type: "Manual",
        },
        {
          coverage: "Refund Management for Surcharge Transactions",
          description:
            "Verify refund processing for a transaction with surcharge",
          expected_results: [
            "Refund should be processed for the full settled amount (\u20b91020)",
            "Both the transaction amount and surcharge should be refunded",
            "The refund should appear as a credit entry on the customer statement",
          ],
          id: "TC-CCMS-631-007",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with available credit limit",
            "A transaction with surcharge has been processed and settled",
          ],
          priority: "High",
          steps: [
            "Process an authorization transaction with MCC 5541 for amount \u20b91000",
            "Process settlement for the same transaction with amount \u20b91020",
            "Process a refund for the full transaction amount",
          ],
          test_type: "Manual",
        },
        {
          coverage: "Repayment Management for Surcharge Transactions",
          description:
            "Verify repayment apportionment for surcharge transactions",
          expected_results: [
            "Repayment should be apportioned to surcharge transactions in FIFO order along with other principal transactions",
            "The repayment apportionment priority for surcharge should be the same as principal",
          ],
          id: "TC-CCMS-631-008",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with multiple transactions including surcharges",
            "Customer has outstanding balance including surcharge amounts",
          ],
          priority: "Medium",
          steps: [
            "Process multiple transactions with different MCCs including surcharges",
            "Make a partial repayment to the credit card account",
            "Verify repayment apportionment",
          ],
          test_type: "Manual",
        },
        {
          coverage: "Billing Management Service, Statement Management Service",
          description:
            "Verify billing statement includes surcharge transactions",
          expected_results: [
            "Surcharge transactions should appear on the billing statement with narration 'Surcharge'",
            "Surcharge amount should be included in the total amount due",
            "Percentage of surcharge amount should be included in the minimum amount due as per the billing policy",
          ],
          id: "TC-CCMS-631-009",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with transactions including surcharges",
            "Billing cycle is complete",
          ],
          priority: "High",
          steps: [
            "Process transactions with surcharges during a billing cycle",
            "Generate billing statement for the account",
            "Verify surcharge representation on the statement",
          ],
          test_type: "Manual",
        },
        {
          coverage: "Statement to EMI for Surcharge Transactions",
          description:
            "Verify Statement to EMI conversion for surcharge transactions",
          expected_results: [
            "Surcharge transactions should be included in the Statement to EMI conversion",
            "Surcharge should be treated similar to other retail or cash principal transactions in the EMI conversion",
          ],
          id: "TC-CCMS-631-010",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with transactions including surcharges",
            "Statement to EMI feature is enabled for the account",
          ],
          priority: "Medium",
          steps: [
            "Process transactions with surcharges during a billing cycle",
            "Generate billing statement for the account",
            "Convert the statement balance to EMI",
          ],
          test_type: "Manual",
        },
        {
          coverage: "Rewards and Loyalty Service for Surcharge Transactions",
          description: "Verify rewards calculation for surcharge transactions",
          expected_results: [
            "Rewards should be awarded for the surcharge transaction as per the transactional reward policy",
            "Rewards points should be calculated correctly based on the transaction amount including surcharge",
          ],
          id: "TC-CCMS-631-011",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with rewards program enabled",
            "Transactional reward policy is configured",
          ],
          priority: "Medium",
          steps: [
            "Process a transaction with MCC 5541 for amount \u20b91000",
            "Process settlement with surcharge amount \u20b91020",
            "Verify rewards calculation",
          ],
          test_type: "Manual",
        },
        {
          coverage:
            "Surcharge Identification, Merchant Category Code Configuration",
          description: "Verify surcharge identification for non-configured MCC",
          expected_results: [
            "Transaction should not be identified as having a surcharge",
            "The entire amount should be treated as a regular debit transaction",
            "No separate surcharge entry should appear on the statement",
          ],
          id: "TC-CCMS-631-012",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with available credit limit",
            "MCC 5812 (Restaurants) is not configured for surcharge identification",
          ],
          priority: "Medium",
          steps: [
            "Process an authorization transaction with MCC 5812 for amount \u20b91000",
            "Process settlement for the same transaction with amount \u20b91020",
          ],
          test_type: "Manual",
        },
        {
          coverage: "Merchant-specific Surcharge Waiver Configuration",
          description:
            "Verify merchant-specific surcharge waiver configuration",
          expected_results: [
            "Surcharge of \u20b920 should be identified",
            "100% waiver should be applied to the surcharge",
            "A credit entry of \u20b920 should appear on the customer statement",
            "No net surcharge amount should be added to the total amount due",
          ],
          id: "TC-CCMS-631-013",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with available credit limit",
            "A specific Merchant ID within MCC 5541 is configured for 100% surcharge waiver",
          ],
          priority: "Medium",
          steps: [
            "Process an authorization transaction with the specific Merchant ID and MCC 5541 for amount \u20b91000",
            "Process settlement for the same transaction with amount \u20b91020",
            "Verify waiver application on the transaction",
          ],
          test_type: "Manual",
        },
        {
          coverage: "Maximum Waiver Value Configuration",
          description: "Verify maximum waiver value configuration",
          expected_results: [
            "Surcharge of \u20b940 should be identified",
            "Percentage waiver calculation would be 50% of \u20b940 = \u20b920",
            "Due to maximum value configuration, waiver should be capped at \u20b910",
            "A credit entry of \u20b910 should appear on the customer statement",
            "Net surcharge amount of \u20b930 should be added to the total amount due",
          ],
          id: "TC-CCMS-631-014",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with available credit limit",
            "A percentage waiver of 50% is configured for MCC 9311 with maximum value of \u20b910",
          ],
          priority: "Medium",
          steps: [
            "Process an authorization transaction with MCC 9311 for amount \u20b91000",
            "Process settlement for the same transaction with amount \u20b91040 (\u20b940 surcharge)",
            "Verify waiver application on the transaction",
          ],
          test_type: "Manual",
        },
        {
          coverage: "Minimum Waiver Value Configuration",
          description: "Verify minimum waiver value configuration",
          expected_results: [
            "Surcharge of \u20b920 should be identified",
            "Percentage waiver calculation would be 1% of \u20b920 = \u20b90.20",
            "Due to minimum value configuration, waiver should be raised to \u20b95",
            "A credit entry of \u20b95 should appear on the customer statement",
            "Net surcharge amount of \u20b915 should be added to the total amount due",
          ],
          id: "TC-CCMS-631-015",
          preconditions: [
            "Credit card management system is up and running",
            "A credit card account exists with available credit limit",
            "A percentage waiver of 1% is configured for MCC 4112 with minimum value of \u20b95",
          ],
          priority: "Medium",
          steps: [
            "Process an authorization transaction with MCC 4112 for amount \u20b91000",
            "Process settlement for the same transaction with amount \u20b91020 (\u20b920 surcharge)",
            "Verify waiver application on the transaction",
          ],
          test_type: "Manual",
        },
        {
          coverage: "Transaction Management Policy Configuration Interface",
          description:
            "Verify transaction management policy configuration interface",
          expected_results: [
            "User should be able to select Merchant Category Code from dropdown",
            "User should be able to optionally select Merchant ID from dropdown",
            "User should be able to select Waiver Type (Flat, Percentage, Slab Based)",
            "For Slab Based waiver, From Amount and To Amount fields should be mandatory",
            "Waiver Value field should be mandatory",
            "Minimum Value field should be mandatory for Percentage waiver type",
            "Maximum Value field should be optional",
            "Configuration should be saved successfully",
          ],
          id: "TC-CCMS-631-016",
          preconditions: [
            "Credit card management system is up and running",
            "User has appropriate permissions to configure transaction management policies",
          ],
          priority: "High",
          steps: [
            "Navigate to the Transaction Management Policy configuration screen",
            "Configure a new surcharge waiver policy with all required parameters",
            "Save the configuration",
          ],
          test_type: "Manual",
        },
      ],
    };
  }
}
