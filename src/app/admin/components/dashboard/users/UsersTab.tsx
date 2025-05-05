'use client';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronRight } from 'lucide-react';
import { UserStatusBadge } from '../../shared/StatusBadges';
import { UserDetailView } from './UserDetailView';
import { formatDate } from '../../shared/utils';

interface User {
    id: string | number;
    name: string;
    email: string;
    company?: string;
    status: string;
    signupDate: string | Date;
    plan?: string;
}

interface Project {
    id: string | number;
    userId: string | number;
    // other project properties
}
interface Ticket {
    id: string | number;
    userId: string | number;
    // other ticket properties
}

interface Request {
    id: string | number;
    userId: string | number;
    // other request properties
}

interface UsersTabProps {
    users: User[];
    projects: Project[];
    tickets: Ticket[];
    requests: Request[];
}

export function UsersTab({
    users,
    projects,
    tickets,
    requests,
}: UsersTabProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Filter function for users
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.company?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            filterStatus === 'all' || user.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className='space-y-4'>
            <div className='flex flex-col sm:flex-row gap-3 justify-between'>
                <div className='relative flex-1'>
                    <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                    <Input
                        placeholder='Search users...'
                        className='pl-8'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select
                    value={filterStatus}
                    onValueChange={setFilterStatus}
                >
                    <SelectTrigger className='w-full sm:w-[180px]'>
                        <SelectValue placeholder='All users' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>All users</SelectItem>
                        <SelectItem value='active'>Active</SelectItem>
                        <SelectItem value='pending'>Pending</SelectItem>
                        <SelectItem value='inactive'>Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className='hidden md:table-cell'>
                                Email
                            </TableHead>
                            <TableHead className='hidden md:table-cell'>
                                Status
                            </TableHead>
                            <TableHead className='hidden lg:table-cell'>
                                Signup Date
                            </TableHead>
                            <TableHead className='hidden lg:table-cell'>
                                Plan
                            </TableHead>
                            <TableHead className='text-right'>
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className='font-medium'>
                                    {user.name}
                                    {user.company && (
                                        <div className='text-xs text-muted-foreground'>
                                            {user.company}
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className='hidden md:table-cell'>
                                    {user.email}
                                </TableCell>
                                <TableCell className='hidden md:table-cell'>
                                    <UserStatusBadge status={user.status} />
                                </TableCell>
                                <TableCell className='hidden lg:table-cell'>
                                    {formatDate(user.signupDate)}
                                </TableCell>
                                <TableCell className='hidden lg:table-cell'>
                                    {user.plan || 'None'}
                                </TableCell>
                                <TableCell className='text-right'>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button
                                                size='sm'
                                                variant='ghost'
                                                className='gap-1'
                                                onClick={() =>
                                                    setSelectedUser(user)
                                                }
                                            >
                                                <span className='sr-only md:not-sr-only md:inline-block'>
                                                    Manage
                                                </span>
                                                <ChevronRight className='h-4 w-4' />
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent className='w-full sm:max-w-xl overflow-auto'>
                                            {/* User Detail View */}
                                            {selectedUser && (
                                                <UserDetailView
                                                    user={selectedUser}
                                                    sites={projects.filter(
                                                        (project) =>
                                                            project.userId ===
                                                            selectedUser.id
                                                    )}
                                                    tickets={tickets.filter(
                                                        (ticket) =>
                                                            ticket.userId ===
                                                            selectedUser.id
                                                    )}
                                                    editRequests={requests.filter(
                                                        (request) =>
                                                            request.userId ===
                                                            selectedUser.id
                                                    )}
                                                billingPlans={[
                                                    {
                                                        name: 'Managed Basic',
                                                        price: 39.99,
                                                        features: [
                                                            'WordPress Hosting',
                                                            'SSL Certificate',
                                                            'Daily Backups',
                                                            'Core Updates',
                                                            'Basic Support',
                                                        ],
                                                    },
                                                    {
                                                        name: 'Managed Pro',
                                                        price: 79.99,
                                                        features: [
                                                            'All Basic Features',
                                                            'Security Monitoring',
                                                            'Performance Optimization',
                                                            'Monthly Reports',
                                                            'Priority Support',
                                                        ],
                                                    },
                                                    {
                                                        name: 'Managed Premium',
                                                        price: 149.99,
                                                        features: [
                                                            'All Pro Features',
                                                            'Daily Malware Scans',
                                                            'Advanced Optimization',
                                                            'Weekly Site Reviews',
                                                            '24/7 Emergency Support',
                                                        ],
                                                    }
                                                ]}
                                            />)}
                                        </SheetContent>
                                    </Sheet>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
