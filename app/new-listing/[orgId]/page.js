import { getUser } from '@workos-inc/authkit-nextjs'
import { WorkOS } from '@workos-inc/node'
import JobForm from '../../../components/JobForm'

const NewListingForOrgPage = async ({params}) => {
    const {user} = await getUser()
    const workos = new WorkOS(process.env.WORKOS_API_KEY)
    if(!user){return 'Please log in'}
    const orgId = params.orgId
    const oms = await workos.userManagement.listOrganizationMemberships({userId:user.id, organizationId:orgId})
    const hasAccess = oms.data.length > 0
    if (!hasAccess) {
        return 'no access'
    }
  return (
    <JobForm orgId={orgId}/>
  )
}

export default NewListingForOrgPage
