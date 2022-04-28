INSERT INTO departments (name)
VALUES
  ('General Managemen'),
  ('Marketing Department'),
  ('Operations Department'),
  ('Finance Department'),
  ('Human Resource Department'),
  ('Sales Department'),
  ('Information Technology'),
  ('Facility management'),
  ('Purchase Department');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Marketing specialist', 80000, 2),
  ('Business analyst', 85000, 3),
  ('Administrative assistant', 60000, 1),
  ('Project Manager', 130000, 1),
  ('Web Designer', 120000, 7),
  ('Desktop Support', 85000, 7),
  ('Sales Manager', 120000, 6),
  ('Chief Executive Officer', 520000, 1),
  ('IT Manager', 140000, 7),
  ('SAP MAnager', 140000, 7),
  ('Marketing Manager', 140000, 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Krissy', 'Dunbobbin', 8, NULL),
  ('Terza', 'Woolf', 10, 1),
  ('Piers', 'Gaveston', 1, 2),
  ('Nikki', 'LeRoi', 9, Null),
  ('Amery', 'Tatterton', 6, 4),
  ('Cammy', 'McCullouch', 6, 4),
  ('Nickie', 'Baudet', 5, 4),
  ('Mona', 'Eisikovitsh', 7, 1),
  ('Herminia', 'McGirl', 2, 8),
  ('Moira', 'Upfold', 2, 8),
  ('Fernande', 'Decker', 3, 8),
  ('Hazel', 'Thoday', 4, 8),
  ('Unica', 'Zurn', 4, 8);
