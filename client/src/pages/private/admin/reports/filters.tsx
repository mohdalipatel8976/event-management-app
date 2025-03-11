import { Button, Form, Input, Select } from "antd";



function AdminReportsFilters({ filters, setFilters, events = [], onFilter }: {
    filters: any;
    setFilters: any;
    events?: any[];
    onFilter?: any;
}) {

    let disableFilterBtn = false;
    if(filters.startDate && !filters.endDate) {
        disableFilterBtn = true;
    }
    if(filters.endDate && !filters.startDate) {
        disableFilterBtn = true;
    }
    return (
        <Form className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-5 items-end" layout="vertical">
            <Form.Item label="Event"
            >
                <Select>
                    <Select.Option key="all" value="">All</Select.Option>
                    {events.map((event: any, index: number) => (
                        <Select.Option key={event._id || index} value={event._id || ""}>
                            {event.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Start Date">
                <Input type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
            </Form.Item>

            <Form.Item label="End Date">
                <Input type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
            </Form.Item>

            <div className="flex gap-5">
                <Button>Clear Filters</Button>
                <Button type="primary"
                    disabled={disableFilterBtn}
                    onClick={onFilter}>Fetch Reports</Button>
            </div>
        </Form>
    );
}

export default AdminReportsFilters;