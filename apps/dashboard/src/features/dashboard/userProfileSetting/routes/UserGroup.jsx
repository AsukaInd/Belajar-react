import { TabView, TabPanel } from 'primereact/tabview';
import { UsersAndGroup } from '~/features/dashboard/userProfileSetting/userGroup/UsersAndGroup'
import { PendingInvites } from '~/features/dashboard/userProfileSetting/userGroup/PendingInvites'

export default function UserGroup() {
	return (
		<div className="layout-content">
			<TabView>
			    <TabPanel className="mb-[24px]" header="Users & Group">
			        <UsersAndGroup/>
			    </TabPanel>
			    <TabPanel className="mb-[24px]" header="Pending Invites">
			        <PendingInvites/>
			    </TabPanel>
			</TabView>
		</div>
	)
}