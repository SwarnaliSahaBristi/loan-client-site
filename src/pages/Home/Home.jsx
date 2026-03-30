import { useLocation } from 'react-router'
import AvailableLoans from '../../components/Home/AvailableLoans'
import Banner from '../../components/Home/Banner'
import CustomerFeedback from '../../components/Home/CustomerFeedback'
import HowItWorks from '../../components/Home/HowItWorks'
import LoanEligibilityPreview from '../../components/Home/LoanEligibilityPreview'
import WhyChooseLoanLink from '../../components/Home/WhyChooseLoanLink'
import useTitle from '../../components/Usetitle/useTitle'
import { useEffect } from 'react'

const Home = () => {
  useTitle("Home")
  const location = useLocation();
  useEffect(() => {
  if (location.hash) {
    const el = document.querySelector(location.hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}, [location]);
  return (
    <div>
      <Banner></Banner>
      <AvailableLoans></AvailableLoans>
      <HowItWorks></HowItWorks>
      <CustomerFeedback></CustomerFeedback>
      <WhyChooseLoanLink></WhyChooseLoanLink>
      <LoanEligibilityPreview></LoanEligibilityPreview>
    </div>
  )
}

export default Home
