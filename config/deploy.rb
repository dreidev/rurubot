# config valid only for current version of Capistrano
lock '3.6.1'

set :application, 'dreibot'
set :repo_url, 'git@github.com:dreidev/rurubot.git'
# This reduced deploy time by not having to clone but pull instead
# If you cahnge the repo you may want to deploy for the first time without this
set :deploy_via, :remote_cache

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp
set :branch, :master

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'
set :deploy_to, '/root/dreibot'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: 'log/capistrano.log', color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, 'config/database.yml', 'config/secrets.yml'
append :linked_files, '.env'

# Default value for linked_dirs is []
# append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system'
# append :linked_dirs, 'bin'
# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5
set :keep_releases, 3

namespace :deploy do

    desc "Runs test before deploying, can't deploy unless they pass"
    task :run_tests do
      run_locally do
          unless system 'npm test'
            puts 'Test(s) failed, so the deployment is being aborted.'
            exit;
         end
      end
      puts "--> All tests passed"
    end

  desc 'Install node modules'
  task :install_node_modules do
    on roles(:web) do
      within release_path do
        execute :npm, 'install'
      end
    end
  end

  desc 'Run tests  on server'
  task :test_on_server do
    on roles(:web) do
      within release_path do
        execute :npm, 'test'
      end
    end
  end

  desc 'Deploy application'
  task :deploy_npm do
    on roles(:web) do
      within release_path do
        execute :npm, 'run', 'deploy'
      end
    end
  end

  before :starting, :run_tests
  before 'deploy:check:linked_files', 'config:push'

  after :updated, :install_node_modules
  after :updated, :test_on_server
  after :updated, :deploy_npm
end
