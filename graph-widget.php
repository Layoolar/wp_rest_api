<?php

/**
 * Plugin Name: Rankmath Graph Widget  
 * Author URI: https://rankmath.com/
 * Description: A custom WordPress dashboard widget to display sample data using Recharts and the WP REST API.
 * Version: 1.0
 * Author: Ayoola Olayiwola
 */


/**
 * Fetch sample data from db based on the duration specified in the request.
 *
 * @param WP_REST_Request $request The request object.
 * @return string The sample data as a JSON string.
 */

function fetch_sample_data($request)
{
    global $wpdb;
    $duration = intval($request->get_param('duration'));

    $table_name = $wpdb->prefix . 'sample';
    $current_date = date("Y-m-d");

    // Calculate the Starting date
    $start_date = date("Y-m-d", strtotime("-$duration days", strtotime($current_date)));
    $results = $wpdb->get_results(
        $wpdb->prepare(
            "SELECT * FROM $table_name WHERE date BETWEEN %s AND %s ORDER BY date ASC",
            $start_date,
            $current_date
        )
    );

    return json_encode($results);
}

// Register the REST API endpoint
add_action('rest_api_init', function () {
    register_rest_route('graph-widget/v1', '/sample-data/(?P<duration>\d+)', array(
        'methods' => 'GET',
        'callback' => 'fetch_sample_data',
    ));
});

// Register the custom graph widget
add_action('wp_dashboard_setup', 'register_graph_dashboard_widget');

function register_graph_dashboard_widget()
{
    wp_add_dashboard_widget('graph_dashboard_widget', 'Graph Widget', 'render_graph_dashboard_widget');
}

function render_graph_dashboard_widget()
{
    echo '<div id="root"></div>';
    $home_url = home_url();

    wp_enqueue_script('dashboard-widget-bundle', plugins_url('/client/public/js/main.js', __FILE__), array(), '1.0', true);
    wp_localize_script('dashboard-widget-bundle', 'wp_data', array('home_url' => $home_url));
}
