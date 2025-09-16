import PaymentClient from "@/components/PaymentClient";

export const metadata = {
  title: "Payment",
  description: "Complete your purchase with Wazir Cutlery's secure payment gateway. " +
      "We accept various payment options, including credit/debit cards, " +
      "for your order of handcrafted knives, swords, and chef cutlery. " +
      "Your transaction is safe and encrypted.",
};

export default function PaymentPage() {
  return <PaymentClient />;
}
