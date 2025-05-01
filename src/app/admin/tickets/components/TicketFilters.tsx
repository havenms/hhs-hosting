import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TicketFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
}

export function TicketFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}: TicketFiltersProps) {
  return (
    <div className='flex flex-col md:flex-row gap-3 justify-between mb-6'>
      <div className='relative flex-1'>
        <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Search tickets...'
          className='pl-8'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='flex gap-2'>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className='w-[130px]'>
            <SelectValue placeholder='Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Statuses</SelectItem>
            <SelectItem value='open'>Open</SelectItem>
            <SelectItem value='in-progress'>In Progress</SelectItem>
            <SelectItem value='closed'>Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={priorityFilter}
          onValueChange={setPriorityFilter}
        >
          <SelectTrigger className='w-[130px]'>
            <SelectValue placeholder='Priority' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Priorities</SelectItem>
            <SelectItem value='high'>High</SelectItem>
            <SelectItem value='medium'>Medium</SelectItem>
            <SelectItem value='low'>Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}