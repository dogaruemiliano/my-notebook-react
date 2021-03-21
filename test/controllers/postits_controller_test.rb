require 'test_helper'

class PostitsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get postits_new_url
    assert_response :success
  end

  test "should get create" do
    get postits_create_url
    assert_response :success
  end

  test "should get edit" do
    get postits_edit_url
    assert_response :success
  end

  test "should get update" do
    get postits_update_url
    assert_response :success
  end

  test "should get destroy" do
    get postits_destroy_url
    assert_response :success
  end

  test "should get show" do
    get postits_show_url
    assert_response :success
  end

  test "should get index" do
    get postits_index_url
    assert_response :success
  end

end
