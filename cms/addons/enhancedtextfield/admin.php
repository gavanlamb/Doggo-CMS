<?php

$app->on('admin.init', function() {
    $this->helper('admin')->addAssets('enhancedtextfield:assets/field-enhancedtextfield.tag');
});
