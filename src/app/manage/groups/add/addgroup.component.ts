import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Group, User } from '../../../_models/index.model';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: User[];
}

declare const $: any;

@Component({
    selector: 'app-addgroup-cmp',
    templateUrl: './addgroup.component.html',
    styleUrls: ['./addgroup.component.css']
})
export class AddGroupComponent implements OnInit, AfterViewInit{
    public dataTable: DataTable;
    private group:Group = new Group();
    private search:string;
    
    constructor(){
        this.group.isPublic = false;
        this.group.users = [];
    }

    ngOnInit(): void {
        this.dataTable = {
            headerRow: [ '#', 'Username', 'Actions' ],
            footerRow: [ '#', 'Username', 'Actions' ],
            dataRows : []
        }

    }
    ngAfterViewInit() {
        $('#datatables').DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [
            [5, 10, 20, -1],
            [5, 10, 20, "All"]
            ],
            responsive: true,
            language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records",
            }

        });

        const table = $('#datatables').DataTable();

        // Edit record
        table.on('click', '.edit', function(e) {
            const $tr = $(this).closest('tr');
            const data = table.row($tr).data();
            alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
            e.preventDefault();
        });

        // Delete a record
        table.on('click', '.remove', (e) => {
            const $tr = $('.remove').closest('tr');
            const data = table.row($tr).data();
            this.removeUser(data[0]-1);
            table.row($tr).remove().draw();
            e.preventDefault();
        });

        //Like record
        table.on('click', '.like', function(e) {
            alert('You clicked on Like button');
            e.preventDefault();
        });

        $('.card .material-datatables label').addClass('form-group');
    }

    create(){
        console.log(this.group);
    }
    findAndAddUser(e){
        e.preventDefault();
        let u = new User();
        u.username = this.search;
        this.group.users.push(u);
        var table = $('#datatables').DataTable();
        table.row.add([this.group.users.length, u.username, '<a href="#" class="btn btn-link btn-danger btn-just-icon remove" style="float: right;height: 28px;margin-top: -7px;"><i class="material-icons">close</i></a>'])
            .draw(true);
    }

    removeUser(i){
        this.group.users.splice(i, 1);
    }
}