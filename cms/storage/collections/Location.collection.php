<?php
 return array (
  'name' => 'Location',
  'label' => '',
  '_id' => 'Location5e803d898b497',
  'fields' => 
  array (
    0 => 
    array (
      'name' => 'Title',
      'label' => 'Title',
      'type' => 'text',
      'default' => 'NULL',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
      ),
      'width' => '1-1',
      'lst' => true,
      'acl' => 
      array (
      ),
      'required' => true,
    ),
    1 => 
    array (
      'name' => 'Description',
      'label' => 'Description',
      'type' => 'textarea',
      'default' => NULL,
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
      ),
      'width' => '1-2',
      'lst' => true,
      'acl' => 
      array (
      ),
      'required' => true,
    ),
    2 => 
    array (
      'name' => 'Types',
      'label' => 'Types',
      'type' => 'collectionlink',
      'default' => 
      array (
      ),
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
        'link' => 'LocationType',
        'display' => 'Title',
        'multiple' => true,
        'limit' => false,
      ),
      'width' => '1-4',
      'lst' => true,
      'acl' => 
      array (
      ),
      'required' => true,
    ),
    3 => 
    array (
      'name' => 'Activities',
      'label' => 'Activities',
      'type' => 'collectionlink',
      'default' => 
      array (
      ),
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
        'link' => 'Activity',
        'display' => 'Title',
        'multiple' => true,
        'limit' => false,
      ),
      'width' => '1-4',
      'lst' => true,
      'acl' => 
      array (
      ),
      'required' => true,
    ),
    4 => 
    array (
      'name' => 'Website',
      'label' => 'Website',
      'type' => 'text',
      'default' => '',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
      ),
      'width' => '3-4',
      'lst' => true,
      'acl' => 
      array (
      ),
      'required' => false,
    ),
    5 => 
    array (
      'name' => 'PhoneNumber',
      'label' => 'Phone Number',
      'type' => 'text',
      'default' => '',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
      ),
      'width' => '1-4',
      'lst' => true,
      'acl' => 
      array (
      ),
    ),
    6 => 
    array (
      'name' => 'Location',
      'label' => 'Location',
      'type' => 'googlemap',
      'default' => NULL,
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
      ),
      'width' => '1-1',
      'lst' => true,
      'acl' => 
      array (
      ),
      'required' => true,
    ),
    7 => 
    array (
      'name' => 'OpeningHours',
      'label' => 'Opening Hours',
      'type' => 'repeater',
      'default' => '',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
        'fields' => 
        array (
          0 => 
          array (
            'type' => 'set',
            'label' => 'Hours',
            'options' => 
            array (
              'fields' => 
              array (
                0 => 
                array (
                  'name' => 'LocationType',
                  'type' => 'collectionselect',
                  'options' => 
                  array (
                    'link' => 'LocationType',
                    'display' => 'Title',
                    'limit' => 20000,
                  ),
                ),
                1 => 
                array (
                  'name' => 'Month/s',
                  'type' => 'multipleselect',
                  'options' => 
                  array (
                    'options' => 'January, February, March, April, May, June, July, August, September, October, November, December',
                  ),
                ),
                2 => 
                array (
                  'name' => 'Day',
                  'type' => 'multipleselect',
                  'options' => 
                  array (
                    'options' => 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Public Holidays, Special Events',
                  ),
                ),
                3 => 
                array (
                  'name' => 'From',
                  'type' => 'time',
                ),
                4 => 
                array (
                  'name' => 'To',
                  'type' => 'time',
                ),
              ),
            ),
          ),
        ),
      ),
      'width' => '1-2',
      'lst' => true,
      'acl' => 
      array (
      ),
    ),
    8 => 
    array (
      'name' => 'OnLeashHours',
      'label' => 'On Leash Hours',
      'type' => 'repeater',
      'default' => '',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
        'fields' => 
        array (
          0 => 
          array (
            'type' => 'set',
            'label' => 'Hours',
            'options' => 
            array (
              'fields' => 
              array (
                0 => 
                array (
                  'name' => 'LocationType',
                  'type' => 'collectionselect',
                  'options' => 
                  array (
                    'link' => 'LocationType',
                    'display' => 'Title',
                    'limit' => 20000,
                  ),
                ),
                1 => 
                array (
                  'name' => 'Month/s',
                  'type' => 'multipleselect',
                  'options' => 
                  array (
                    'options' => 'January, February, March, April, May, June, July, August, September, October, November, December',
                  ),
                ),
                2 => 
                array (
                  'name' => 'Day',
                  'type' => 'multipleselect',
                  'options' => 
                  array (
                    'options' => 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Public Holidays, Special Events',
                  ),
                ),
                3 => 
                array (
                  'name' => 'From',
                  'type' => 'time',
                ),
                4 => 
                array (
                  'name' => 'To',
                  'type' => 'time',
                ),
              ),
            ),
          ),
        ),
      ),
      'width' => '1-2',
      'lst' => true,
      'acl' => 
      array (
      ),
    ),
  ),
  'sortable' => false,
  'in_menu' => false,
  '_created' => 1585462665,
  '_modified' => 1587698676,
  'color' => '#A0D468',
  'acl' => 
  array (
    'public' => 
    array (
      'entries_view' => true,
    ),
  ),
  'rules' => 
  array (
    'create' => 
    array (
      'enabled' => false,
    ),
    'read' => 
    array (
      'enabled' => false,
    ),
    'update' => 
    array (
      'enabled' => false,
    ),
    'delete' => 
    array (
      'enabled' => false,
    ),
  ),
  'contentpreview' => 
  array (
    'enabled' => false,
  ),
  'icon' => 'globe.svg',
);