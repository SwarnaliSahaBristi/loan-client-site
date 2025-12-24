import AvailableLoans from '../../components/Home/AvailableLoans'
import Banner from '../../components/Home/Banner'
import CustomerFeedback from '../../components/Home/CustomerFeedback'
import HowItWorks from '../../components/Home/HowItWorks'
import LoanEligibilityPreview from '../../components/Home/LoanEligibilityPreview'
import WhyChooseLoanLink from '../../components/Home/WhyChooseLoanLink'
import useTitle from '../../components/Usetitle/useTitle'

const Home = () => {
  useTitle("Home")
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
