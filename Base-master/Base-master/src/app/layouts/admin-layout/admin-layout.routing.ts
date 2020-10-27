import { Routes } from '@angular/router';


import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { EventsRegComponent } from '../../events-reg/events-reg.component';
import { EventslistComponent } from '../../eventslist/eventslist.component';
import { EventDetailsComponent } from '../../event-details/event-details.component';
import { EventUpdateComponent } from '../../event-update/event-update.component';
import { UserCreationComponent } from '../../user-creation/user-creation.component';
import { AmScanComponent } from '../../am-scan/am-scan.component';
import { PmScanComponent } from '../../pm-scan/pm-scan.component';
import { UserUpdateComponent } from '../../user-update/user-update.component';
import { AdminRegComponent } from '../../admin-reg/admin-reg.component';
import { AdminlistComponent } from '../../adminlist/adminlist.component';
import { AdminUpdateComponent } from '../../admin-update/admin-update.component';
import { UserUploadComponent } from '../../user-upload/user-upload.component';

export const AdminLayoutRoutes: Routes = [
    //{ path: 'user',           component: UserComponent },
    { path: 'events-reg', component: EventsRegComponent },
    { path: 'events', component: EventslistComponent },
    { path: 'events/:id', component: EventDetailsComponent },
    { path: 'events/:id/update', component: EventUpdateComponent },
    { path: 'events/:id/user-creation', component: UserCreationComponent },
    { path: 'events/:id/am-scan', component: AmScanComponent },
    { path: 'events/:id/pm-scan', component: PmScanComponent },
    { path: 'events/user/update/:id', component: UserUpdateComponent},
    { path: 'admin-reg', component: AdminRegComponent},
    { path: 'adminlist', component: AdminlistComponent},
    { path: 'events/admin/update/:id', component: AdminUpdateComponent},
    { path: 'events/:id/user-upload', component: UserUploadComponent},
    //{ path: 'typography',     component: TypographyComponent },
    //{ path: 'icons',          component: IconsComponent },
    //{ path: 'maps',           component: MapsComponent },
    //{ path: 'notifications',  component: NotificationsComponent },
    //{ path: 'upgrade',        component: UpgradeComponent },
];
