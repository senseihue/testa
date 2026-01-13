interface ISessionProfile {
  id: number
  name: string
  surname: string
  pin: string
  first_name: string
  last_name: string
  middle_name: string
  username: string
  email: string
  email_verified_at: string
  organization_id: number
  password: string
  type: string
  one_id_user_id: number
  status: boolean //default false
  tg_id: number
  person_id: number
  created_by: string
  updated_by: string
  deleted_by: string
  dont_touch: boolean
  deleted_at: string
  remember_token: string
  created_at: string
  updated_at: string
}



interface Investor {
  id: number
  name: string
  surname: string
  email: string
  phone: string
  pin: string
  country: string
  website: string
  position: string
  company_name: string
  contact_person: string
  net_profit: string
  annual_revenue: string
  number_of_employees: number
  investment_type: InvestmentType
  target_industry: InvestmentType
  region: Region
  investment_amount: InvestmentType
  investment_amount_variant: string
  has_business: boolean
  investment_experience: string
  source: string
  source_variant: string
  comments: string
  is_resident: boolean
  reject_reason: string
}

interface Region {
  id: number
  region: string
  code: string
}

interface InvestmentType {
  id: number
  content: string
  created: string
}

interface Businessmen {
  id: number
  company_name: string
  tin: string
  website: string
  legal_address: string
  name: string
  surname: string
  email: string
  phone: string
  pin: string
  project_name: string
  project_purpose: string
  required_investment: string
  own_contribution: string
  is_resident: boolean
  reject_reason: string
}
